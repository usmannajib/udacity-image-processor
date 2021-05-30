import express, { Request, Response } from "express";
import path from "path";
import sharp from "sharp";
import { promises as fsPromises } from "fs";

const router = express.Router();

router.get("/images", async (req: Request, res: Response) => {
  const { filename: imageName, width, height } = req.query;

  const thumbImgPath = path.join(
    __dirname,
    `../../../assets/thumb/${imageName}.jpg`
  );

  const isCached = await isImageCached(thumbImgPath);
  res.setHeader("Content-Type", "image/jpeg");

  if (isCached) {
    const imgFile = await fsPromises.readFile(thumbImgPath);
    res.write(imgFile);
    res.end();
    return;
  }

  const fullImgPath = path.join(
    __dirname,
    `../../../assets/full/${imageName}.jpg`
  );

  const image = await sharp(fullImgPath)
    .resize(Number(width), Number(height))
    .jpeg()
    .toBuffer();

  res.write(image);
  res.end();

  fsPromises.writeFile(thumbImgPath, image);
});

const isImageCached = async (imagePath: string) =>
  fsPromises
    .access(imagePath)
    .then(() => true)
    .catch(() => false);

export default router;

import express, { Request, Response } from "express";
import path from "path";
import sharp from "sharp";

const router = express.Router();

router.get("/images", async (req: Request, res: Response) => {
  res.setHeader("Content-Type", "image/jpeg");
  const { filename: imageName, width, height } = req.query;
  const imagePath = path.join(
    __dirname,
    `../../../assets/full/${imageName}.jpg`
  );
  const image = await sharp(imagePath)
    .resize(Number(width), Number(height))
    .jpeg()
    .toBuffer();

  res.write(image);
  res.end();
});

export default router;

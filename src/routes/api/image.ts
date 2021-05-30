import express, { Request, Response } from "express";
import ImageProcessor from "../../processor";

const router = express.Router();

router.get("/images", async (req: Request, res: Response) => {
  const { filename: imageName, width, height } = req.query;
  const processor = new ImageProcessor(imageName as string);
  const isCached = await processor.isCached();

  let img: Buffer | null = null;

  try {
    img = await (isCached
      ? processor.loadFromCache()
      : processor.load(Number(width), Number(height)));
  } catch (err: unknown) {
    res.status(404).send("Error: Image not found");
    return;
  }

  res.setHeader("Content-Type", "image/jpeg");
  res.write(img);
  res.end();

  if (!isCached) {
    processor.cache(img as Buffer);
  }
});

export default router;

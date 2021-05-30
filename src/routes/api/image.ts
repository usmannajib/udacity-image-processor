import express, { Request, Response } from "express";
import ImageProcessor from "../../processor";

const router = express.Router();

router.get("/images", async (req: Request, res: Response) => {
  const { filename: imageName, width, height } = req.query;
  const processor = new ImageProcessor(imageName as string);
  const isCached = await processor.isCached();

  res.setHeader("Content-Type", "image/jpeg");

  const img = await (isCached
    ? processor.loadFromCache()
    : processor.load(Number(width), Number(height)));

  res.write(img);
  res.end();

  if (!isCached) {
    processor.cache(img);
  }
});

export default router;

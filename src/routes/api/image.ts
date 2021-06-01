import express, { Request, Response } from "express";
import ImageProcessor from "../../processor";

const router = express.Router();

router.get("/images", async (req: Request, res: Response): Promise<void> => {
  const { filename: imageName, width, height } = req.query;
  let validationErr: string | null = null;

  if (!imageName) {
    validationErr = "Error: Invalid image name";
  } else if (!width || isNaN(Number(width))) {
    validationErr = "Error: Invalid width value";
  } else if (!height || isNaN(Number(height))) {
    validationErr = "Error: Invalid height value";
  }

  if (validationErr) {
    res.status(404).send(validationErr);
    return;
  }

  const processor = new ImageProcessor(
    imageName as string,
    Number(width),
    Number(height)
  );
  const isCached = await processor.isCached();

  let img: Buffer | null = null;

  try {
    img = await (isCached ? processor.loadFromCache() : processor.load());
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

import path from "path";
import { promises as fsPromises } from "fs";
import sharp from "sharp";

export default class ImageProcessor {
  private static readonly assets = path.join(__dirname, "../../assets");
  private readonly fullPath;
  private readonly thumbPath;

  constructor(imgName: string) {
    this.fullPath = path.join(ImageProcessor.assets, "full", imgName + ".jpg");
    this.thumbPath = path.join(
      ImageProcessor.assets,
      "thumb",
      imgName + ".jpg"
    );
  }

  isCached(): Promise<boolean> {
    return fsPromises
      .access(this.thumbPath)
      .then(() => true)
      .catch(() => false);
  }

  loadFromCache(): Promise<Buffer> {
    return fsPromises.readFile(this.thumbPath);
  }

  load(width: number, height: number): Promise<Buffer> {
    return sharp(this.fullPath)
      .resize(Number(width), Number(height))
      .jpeg()
      .toBuffer();
  }

  cache(img: Buffer): Promise<void> {
    return fsPromises.writeFile(this.thumbPath, img);
  }
}

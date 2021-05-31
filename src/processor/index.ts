import path from "path";
import { promises as fsPromises } from "fs";
import sharp from "sharp";

export default class ImageProcessor {
  private static readonly assetsPath = path.join(__dirname, "../../assets");
  private readonly fullPath;
  private readonly thumbPath;

  constructor(imgName: string) {
    this.fullPath = path.join(
      ImageProcessor.assetsPath,
      "full",
      imgName + ".jpg"
    );
    this.thumbPath = path.join(
      ImageProcessor.assetsPath,
      "thumb",
      imgName + ".jpg"
    );
  }

  async isCached(): Promise<boolean> {
    return this.exists(this.thumbPath);
  }

  async loadFromCache(): Promise<Buffer> {
    return fsPromises.readFile(this.thumbPath);
  }

  async load(width: number, height: number): Promise<Buffer> {
    return sharp(this.fullPath)
      .resize(Number(width), Number(height))
      .jpeg()
      .toBuffer();
  }

  async cache(img: Buffer): Promise<void> {
    const thumbPath = path.join(ImageProcessor.assetsPath, "thumb");
    const thumbsExist = await this.exists(thumbPath);

    if (!thumbsExist) {
      await fsPromises.mkdir(thumbPath);
    }

    return fsPromises.writeFile(this.thumbPath, img);
  }

  private async exists(imgPath: string): Promise<boolean> {
    return fsPromises
      .access(imgPath)
      .then(() => true)
      .catch(() => false);
  }
}

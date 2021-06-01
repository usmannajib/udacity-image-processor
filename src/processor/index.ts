import path from "path";
import { promises as fsPromises } from "fs";
import sharp from "sharp";
import del from "del";

export default class ImageProcessor {
  private static readonly assetsPath = path.join(__dirname, "../../assets");
  private readonly fullPath: string;
  private readonly thumbPath: string;
  private readonly width: number;
  private readonly height: number;

  constructor(imgName: string, width: number, height: number) {
    this.fullPath = path.join(
      ImageProcessor.assetsPath,
      "full",
      `${imgName}.jpg`
    );
    this.thumbPath = path.join(
      ImageProcessor.assetsPath,
      "thumb",
      `${imgName}${width}x${height}.jpg`
    );
    this.width = width;
    this.height = height;
  }

  async isCached(): Promise<boolean> {
    return this.exists(this.thumbPath);
  }

  async loadFromCache(): Promise<Buffer> {
    return fsPromises.readFile(this.thumbPath);
  }

  async load(): Promise<Buffer> {
    return sharp(this.fullPath)
      .resize(this.width, this.height)
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

  async removeCache(): Promise<string[]> {
    return del([this.thumbPath]);
  }

  private async exists(imgPath: string): Promise<boolean> {
    return fsPromises
      .access(imgPath)
      .then(() => true)
      .catch(() => false);
  }
}

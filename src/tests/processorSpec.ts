import ImageProcessor from "../processor";
import rimraf from "rimraf";
import path from "path";

const processor = new ImageProcessor("santamonica");

describe("Test ImageProcessor", () => {
  beforeEach(() => {
    rimraf(path.join(__dirname, "../../assets/thumb/*.jpg"), () => {
      console.log("Cache removed");
    });
  });

  describe("Test cache", () => {
    it("Should return false before image is cached", async () => {
      const isCached = await processor.isCached();
      expect(isCached).toBeFalse();
    });
    it("Should return true after image is cached", async () => {
      await processor.cache(Buffer.from(""));
      const isCached = await processor.isCached();
      expect(isCached).toBeTrue();
    });
    it("Should return from cache", async () => {
      await processor.cache(Buffer.from(""));
      const img = await processor.loadFromCache();
      expect(img).toBeDefined();
    });
  });

  describe("Test image resize", () => {
    it("Should resize an image", async () => {
      const img = await processor.load(200, 200);
      expect(img).toBeDefined();
      expect(img).toBeInstanceOf(Buffer);
    });
  });
});

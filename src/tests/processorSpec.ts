import ImageProcessor from "../processor";
import path from "path";
import del from "del";

const processor = new ImageProcessor("santamonica");

describe("Test ImageProcessor", () => {
  beforeEach(() => {
    clearThumbs();
  });

  afterAll(() => {
    clearThumbs();
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
    // the following test sometimes fails randomly, probably due to how fsPromises works, please try a couple times if it fails
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

async function clearThumbs() {
  await del([path.join(__dirname, "../../assets/thumb/*.jpg")]);
}

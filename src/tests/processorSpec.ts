import ImageProcessor from "../processor";

const processor = new ImageProcessor("santamonica", 200, 200);

describe("Test ImageProcessor", () => {
  describe("Test cache", () => {
    it("Should return false before image is cached", async () => {
      await processor.removeCache();
      const isCached = await processor.isCached();
      expect(isCached).toBeFalse();
    });
    it("Should return true after image is cached", async () => {
      await processor.cache(Buffer.from(""));
      const isCached = await processor.isCached();
      expect(isCached).toBeTrue();
      await processor.removeCache();
    });
    it("Should return from cache", async () => {
      await processor.cache(Buffer.from(""));
      const img = await processor.loadFromCache();
      expect(img).toBeDefined();
      await processor.removeCache();
    });
  });

  describe("Test image resize", () => {
    it("Should resize an image", async () => {
      const img = await processor.load();
      expect(img).toBeDefined();
      expect(img).toBeInstanceOf(Buffer);
    });
  });
});

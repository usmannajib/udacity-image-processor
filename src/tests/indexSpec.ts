import supertest from "supertest";
import app from "../";

const request = supertest(app);

describe("Test /image endpoint", () => {
  it("Should return a valid response with a valid file", async () => {
    const res = await request.get(
      "/api/images?filename=fjord&width=200&height=200"
    );
    expect(res.status).toEqual(200);
    expect(res.body).toBeDefined();
  });
  it("Should return an error with an invalid file", async () => {
    const res = await request.get(
      "/api/images?filename=invalid&width=200&height=200"
    );
    expect(res.status).toEqual(404);
    expect(res.body).toEqual({});
  });
});

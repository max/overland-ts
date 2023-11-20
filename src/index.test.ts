import { describe, expect, it } from "bun:test";
import { app } from "./index";

describe("Elysia", () => {
  it("responds with 400 when no bearer token is provided", async () => {
    const response = await app
      .handle(
        new Request("http://localhost:3000/", {
          method: "POST",
        }),
      )
      .then((res) => res.json());

    expect(response).toEqual({ error: "INVALID_REQUEST" });
  });

  it("responds with a 403 when an invalid bearer token is provided", async () => {
    const response = await app
      .handle(
        new Request("http://localhost:3000/", {
          headers: {
            Authorization: `Bearer invalid_token`,
          },
          method: "POST",
        }),
      )
      .then((res) => res.json());

    expect(response).toEqual({ error: "UNAUTHORIZED" });
  });

  it("accepts a post with a valid bearer authorization", async () => {
    const response = await app
      .handle(
        new Request("http://localhost:3000/", {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          },
          method: "POST",
        }),
      )
      .then((res) => res.json());

    expect(response).toEqual({ result: "ok" });
  });
});

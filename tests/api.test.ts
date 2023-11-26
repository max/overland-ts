import { describe, expect, it } from "bun:test";
import { app } from "../src/index";
import config from "../src/lib/config";
import overlandRequestMock from "./fixtures/overland-request-mock.json";

describe("Overland API", () => {
  it("responds with a 403 when no bearer token is provided", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/api/locations", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(overlandRequestMock),
      })
    );

    expect(res.status).toBe(403);
  });

  it("responds with a 403 when an invalid bearer token is provided", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/api/locations", {
        headers: {
          authorization: `Bearer invalid_token`,
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(overlandRequestMock),
      })
    );

    expect(res.status).toBe(403);
  });

  it("responds with a 200 when a valid bearer token is provided", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/api/locations", {
        headers: {
          authorization: `Bearer ${config.api.token}`,
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(overlandRequestMock),
      })
    );

    expect(res.status).toBe(200);
  });

  it("responds with a 400 when an invalid body is provided", async () => {
    const res = await app.handle(
      new Request("http://localhost:3000/api/locations", {
        headers: {
          authorization: `Bearer ${config.api.token}`,
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({}),
      })
    );

    expect(res.status).toBe(400);
  });
});

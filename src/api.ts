import bearer from "@elysiajs/bearer";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import config from "./lib/config";
import { UnauthorizedError } from "./lib/error";
import { OverlandSchema } from "./lib/overland";

export const apiRouter = new Elysia().group("/api", (app) =>
  app
    .use(swagger())
    .use(bearer())
    .on("beforeHandle", ({ bearer }) => {
      if (bearer !== config.api.token) {
        throw new UnauthorizedError("Invalid token");
      }
    })
    .post("/locations", async ({ body }) => body, {
      body: OverlandSchema,
    }),
);

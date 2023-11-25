import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";
import validateToken from "./lib/validate-token";

export const app = new Elysia()
  .use(bearer())
  .on("beforeHandle", validateToken)
  .post("/", () => ({
    result: "ok",
  }))
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

import { Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";

const app = new Elysia()
  .use(bearer())
  .post("/", () => "Hello World!", {
    beforeHandle({ bearer, set }) {
      if (!bearer) {
        set.status = 400;
        return "INVALID_REQUEST";
      }

      if (bearer !== process.env.API_TOKEN) {
        set.status = 403;
        return "UNAUTHORIZED";
      }
    },
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

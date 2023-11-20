import { bearer } from "@elysiajs/bearer";
import { Elysia } from "elysia";

const validateToken = (context: { [x: string]: any }): any => {
  const { bearer, set } = context;

  if (!bearer) {
    set.status = 400;
    return { error: "INVALID_REQUEST" };
  }

  // TODO: This is potentially insecure. It could compare `undefined` with `undefined`.
  if (bearer !== process.env.API_TOKEN) {
    set.status = 403;
    return { error: "UNAUTHORIZED" };
  }
};

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

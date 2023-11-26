import { Elysia, ErrorHandler } from "elysia";
import { apiRouter } from "./api";
import { logger } from "./lib/logger";

const handleError: ErrorHandler = ({ code, error }) => {
  logger.error(error);

  return {
    code,
    message: error.message,
  };
};

const logRequest = (context: { [x: string]: any }) => {
  const { request } = context;

  logger.info(
    `${request.method} ${request.url} - ${request.headers.get("user-agent")}`
  );
};

export const app = new Elysia()
  .onError(handleError)
  .on("beforeHandle", logRequest)
  .use(apiRouter)
  .listen(process.env.PORT || 3000);

logger.info(
  `📍 Overland API is running at ${app.server?.hostname}:${app.server?.port}`
);

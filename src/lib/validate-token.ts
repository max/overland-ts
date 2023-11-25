import config from "./config";

const validateToken = (context: { [x: string]: any }): any => {
  const { bearer, set } = context;

  if (!bearer) {
    set.status = 400;
    return { error: "INVALID_REQUEST" };
  }

  if (bearer !== config.api.token) {
    set.status = 403;
    return { error: "UNAUTHORIZED" };
  }
};

export default validateToken;

export class UnauthorizedError extends Error {
  code = "UNAUTHORIZED";
  status = 403;

  constructor(message: string) {
    super(message);
  }
}

import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export default function errorHandlerMiddleware(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).send("Oops! Something went wrong.");
}

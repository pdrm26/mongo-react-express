import { NextFunction, Request, Response } from "express";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  const errMessage = err.message || "Something went wrong.";
  res.status(500).send({
    message: errMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
}

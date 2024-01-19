import { NextFunction, Request, Response } from "express";

export default function timestampLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const now = new Date();
  console.log(`${now.toISOString()} Incoming request to ${req.path}`);

  next();
}

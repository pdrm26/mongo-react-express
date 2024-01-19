import { NextFunction, Request, Response } from "express";

export default function personalizeSignatureMidleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.signature = "Party Enthusiast";
  next();
}

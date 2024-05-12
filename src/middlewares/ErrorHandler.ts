import { NextFunction, Request, Response } from "express";
import Handler from "../exceptions/Handler";

export const ErrorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof Handler) {
    return res.status(error.statusCode).json({
      message: error.errorCode,
    });
  }

  return res.status(500).send({ message: "Server Error" });
};

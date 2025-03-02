import { Request, Response, NextFunction } from "express";

export function notFoundHandler(
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  res.status(404).json({
    error: 404,
    message: "Route not found.",
  });
}

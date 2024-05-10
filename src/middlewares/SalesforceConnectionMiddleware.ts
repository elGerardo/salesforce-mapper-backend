import { Request, NextFunction, Response } from "express";
import jsforce from "jsforce";

export default class SalesforceConnectionMiddleware {
  public static handle(req: Request, res: Response, next: NextFunction) {
    if (
      typeof req.headers["x-instance-url"] !== "string" ||
      typeof req.headers["x-access-token"] !== "string"
    ) {
      res.send("failed");
      return;
    }

    const conn = new jsforce.Connection({
      instanceUrl: req.headers["x-instance-url"],
      accessToken: req.headers["x-access-token"],
    });

    res.locals.sfConn = conn;

    next();
  }
}

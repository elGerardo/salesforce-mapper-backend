import { Request, NextFunction, Response } from "express";
import jsforce from "jsforce";

export default class SalesforceConnectionMiddleware {
  public static handle(req: Request, res: Response, next: NextFunction) {
    if (typeof req.headers["x-instance-url"] !== "string") {
      res.status(400).json({ message: "Missing X-INSTACE-URL" });
      return;
    }

    if (typeof req.headers["x-access-token"] !== "string") {
      res.status(400).json({ message: "Missing X-ACCESS-TOKEN" });
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

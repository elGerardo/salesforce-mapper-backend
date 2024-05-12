import { Connection } from "jsforce";
import GetDescribe from "../actions/jsforce/GetDescribe";
import { Request, Response } from "express";
import GetByQuery from "../actions/jsforce/GetByQuery";
import Handler from "../exceptions/Handler";

export default class JSForceController {
  public static async login(req: Request, res: Response) {
    const payload = req.body;

    const conn = new Connection({
      clientId: payload.client_id,
      clientSecret: payload.client_secret,
      ...(payload.org_url === "https://test.salesforce.com"
        ? { loginUrl: payload.org_url }
        : { instanceUrl: payload.org_url }),
    });

    await conn.login(payload.username, payload.password).catch((error) => {
      throw new Handler("E_SF_LOGIN", error, 401);
    });

    res.status(201).json({
      access_token: conn.accessToken,
      instance_url: conn.instanceUrl,
    });
  }

  public static async getDescribe(req: Request, res: Response) {
    const { result, success } = await GetDescribe.handle(
      res.locals.sfConn,
      req.params.sobject
    );

    if (success) {
      for (let i = 0; i < result.fields.length; i++) {
        const { name, label } = result.fields[i];
        result.fields[i] = { name, label };
      }

      return res.status(200).json(result.fields);
    }

    return res.status(500).json({ message: result });
  }

  public static async get(req: Request, res: Response) {
    let { limit, offset, fields }: any = req.query;

    fields = JSON.parse(fields);
    let queryString = "SELECT Id, ";

    for (const index of fields.keys()) {
      const item = fields[index];

      if (index + 1 !== fields.length) queryString = queryString + item + ", ";
      else queryString = queryString + item;
    }

    queryString = `${queryString} FROM ${req.params.sobject} LIMIT ${limit} OFFSET ${offset}`;

    const { result, status } = await GetByQuery.handle(
      res.locals.sfConn,
      queryString
    );
    res.status(status).json({ query: queryString, ...result });
  }

  public static async find(req: Request, res: Response) {
    let {
      fields,
      where_value,
      where_field,
      where_conditional,
      limit,
      offset,
    }: any = req.query;

    fields = JSON.parse(fields);

    let queryString = "SELECT Id, ";

    if(where_value !== "true" && where_value !== "false" && where_conditional === "=") where_value = `${where_value}`;

    if (where_conditional === "LIKE") {
      where_value = `'%${where_value}%'`;
    }

    for (const index of fields.keys()) {
      const item = fields[index];

      if (index + 1 !== fields.length) queryString = queryString + item + ", ";
      else queryString = queryString + item;
    }

    queryString = `${queryString} FROM ${req.params.sobject} WHERE ${where_field} ${where_conditional} ${where_value} LIMIT ${limit} OFFSET ${offset}`;

    const { result, status } = await GetByQuery.handle(
      res.locals.sfConn,
      queryString
    );
    res.status(status).json({ ...result, query: queryString });
    return;
  }
}

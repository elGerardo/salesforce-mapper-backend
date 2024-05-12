import { Connection } from "jsforce";
import Handler from "../../exceptions/Handler";

export default class GetDescribe {
  public static async handle(
    conn: Connection,
    sobject: string
  ): Promise<
    | {
        result: { fields: Array<{ name: string; label: string }> };
        success: true;
      }
    | { result: string; success: false }
  > {
    let success = true;
    const result = await conn
      .sobject(sobject)
      .describe(function (err, meta) {
        if (!err) {
          return meta;
        }
      })
      .catch((err) => {
        throw new Handler("E_SOBJECT_NOT_FOUND", err, 404)
      });

      return { result, success };
  }
}

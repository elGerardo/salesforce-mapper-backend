import { Connection, Error } from "jsforce";

export default class GetDescribe {
  public static async handle(
    conn: Connection,
    sobject: string
  ): Promise<
    | {
        result: { fields: Array<{ name: string; label: string }> };
        success: true;
      }
    | { result: Error; success: false }
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
        success = false;
        return err.toString();
      });

      return { result, success };
  }
}

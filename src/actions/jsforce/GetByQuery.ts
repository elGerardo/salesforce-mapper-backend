import jsforce from "jsforce";

export default class GetByQuery {
  public static async handle(conn: jsforce.Connection, query: string) {
    let success = true;
    let status = 200;
    const result = await conn
      .query(query, {}, (err, result) => {
        if (err) {
          status = 500;
          success = false;
          return { message: err.toString() };
        }
        return result;
      })

    return { result, success, status };
  }
}

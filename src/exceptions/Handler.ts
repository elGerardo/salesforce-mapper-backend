export default class Handler extends Error {
  public errorCode: string;
  public statusCode: number;

  constructor(error_code: string, message: string, status_code: number) {
    super(message);
    this.errorCode = error_code;
    this.statusCode = status_code;
  }
}

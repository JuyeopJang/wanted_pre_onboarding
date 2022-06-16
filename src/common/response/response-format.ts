export class Response {
  statusCode: number;
  message: string;
  data: object;

  constructor(statusCode: number, message = '', data: object) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

import type { IError } from "./IError";

//Controller:

export type StatusCode = 200 | 201 | 400 | 404 | 409 | 500; // 200	OK, 201	Created, 400	Bad Request, 404	Not Found, 409	Conflict, 500 Internal Server Error

interface SuccessBody<T> {
  success: true;
  data: T;
}
interface ErrorBody {
  success: false;
  error: IError;
}
type ResponseBody<T> = SuccessBody<T> | ErrorBody;

export interface HttpResponse<T> {
  statusCode: StatusCode;
  body: ResponseBody<T>;
}

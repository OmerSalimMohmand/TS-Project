import type { IError } from "./IError";
export type StatusCode = 200 | 201 | 400 | 404 | 409 | 500;
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
export {};
//# sourceMappingURL=HttpResponse.d.ts.map
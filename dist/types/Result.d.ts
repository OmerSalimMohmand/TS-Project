import type { IError } from "./IError";
interface SuccessResult<T> {
    success: true;
    data: T;
    error: null;
}
interface ErrorResult {
    success: false;
    data: null;
    error: IError;
}
export type Result<T> = SuccessResult<T> | ErrorResult;
export declare function createErrorResult(error: IError): Result<never>;
export declare function createSuccessResult<T>(data: T): Result<T>;
export {};
//# sourceMappingURL=Result.d.ts.map
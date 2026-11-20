export type ErrorCode = "NOT_FOUND" | "UPDATE_FAILED" | "INSUFFICIENT_STOCK" | "INVALID_DATA" | "ROLLBACK_FAILED" | "INTERNAL_SERVER_ERROR";
type ErrorDetailsValue = number | string | unknown | {
    [key: string]: ErrorDetailsValue;
};
export interface IError {
    code: ErrorCode;
    message: string;
    details?: Record<string, ErrorDetailsValue>;
}
export {};
//# sourceMappingURL=IError.d.ts.map
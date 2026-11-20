export type ErrorCode =
  | "NOT_FOUND"
  | "UPDATE_FAILED"
  | "INSUFFICIENT_STOCK"
  | "INVALID_DATA"
  | "ROLLBACK_FAILED"
  | "INTERNAL_SERVER_ERROR";

type ErrorDetailsValue =
  | number
  | string
  | unknown //***
  | { [key: string]: ErrorDetailsValue }; // { [key: string]: ErrorDetailsValue } type in here is what matches with previous error-detail's type which is Record<string, ErrorDetailsValue>

export interface IError {
  code: ErrorCode;
  message: string;
  details?: Record<string, ErrorDetailsValue>;
  // details?: { [Key: string]: number | string };
}
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

export function createErrorResult(error: IError): Result<never> {
  return {
    success: false,
    data: null,
    error,
  };
}

export function createSuccessResult<T>(data: T): Result<T> {
  return {
    success: true,
    data,
    error: null,
  };
}



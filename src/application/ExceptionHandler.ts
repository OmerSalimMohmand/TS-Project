import type { HttpResponse } from "../types/HttpResponse";

export function executeSafely<T>(
  operation: () => HttpResponse<T>,
): HttpResponse<T> {
  try {
    return operation();
  } catch (error) {
    return exceptionHandler(error);
  }
}
function exceptionHandler(error: unknown): HttpResponse<never> {
  //log original error
  console.error("Unexpected application error:", error);
  //return generic response
  return {
    statusCode: 500,
    body: {
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "An unexpected error occurred",
      },
    },
  };
}

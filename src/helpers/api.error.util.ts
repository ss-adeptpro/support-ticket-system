import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TApiErrorResponse = {
  status: number,
  data: { message: string}
}

/**
 * Check if it is Api response
 * 
 * @param error unknown
 * @returns error type
 */
export function isApiResponse(error: unknown): error is TApiErrorResponse {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    typeof (error as any).status === "number"
  );
}

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

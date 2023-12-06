import { isErrorWithMessage, isFetchBaseQueryError } from "../helpers/api.error.util"

const useApiError = (err : unknown) => {
  if (isFetchBaseQueryError(err)) {
    return 'error' in err ? err.error : JSON.stringify(err?.data)
  } else if (isErrorWithMessage(err)) {
    return err?.message
  }
}

export default useApiError
import { TAccessTokenResponse } from "../features/auth/auth.types";
import { selectCurrentToken } from "../features/auth/authSlice"
import { useAppSelector } from "../store/app.hook"
import { jwtDecode, JwtPayload } from "jwt-decode";
import { isEmptyString } from "../helpers/util";

const useAuthDetails = () => {
  const currentToken = useAppSelector(selectCurrentToken) as string;
  console.log(' currentToken ', currentToken)
  let isManager = false;
  let isAdmin = false;
  let isEmployee = false;
  let isUser = false;
  let status = "";

  const errorReturn = { username: "", roles: [], isManager, isAdmin, isEmployee, isUser, status };

  if (!isEmptyString(currentToken)) {

    try {
      const decodedToken = jwtDecode<JwtPayload>(currentToken) as TAccessTokenResponse;
      console.log('decodedToken ', decodedToken)
      const { username, roles } = decodedToken.UserInfo;
      isManager = roles.includes("Manager");
      isAdmin = roles.includes("Admin");
      isEmployee = roles.includes("Employee");

      if (isManager) status = "Manager";
      if (isAdmin) status = "Admin";
      if (isEmployee) status = "Employee";

      if(isManager || isAdmin || isEmployee) isUser = true;

      return { username, roles, isAdmin, isEmployee, isUser, status };

    } catch (error) {
      //TODO: errorBoundary
        return errorReturn;
    }
  }

  return errorReturn;
}

export default useAuthDetails
import { Navigate, Outlet, useLocation } from "react-router";
import useAuthDetails from "../../hooks/useAuthDetails";
import { routes } from "../../types/routes.types";
import { TUserRoles, TUserRolesTypes } from "./auth.types";

type Props = {
  allowedRoles: TUserRolesTypes;
}

const RequiredAuth = ({allowedRoles}: Props) => {
  const location = useLocation();

  //could be multiple roles - so returning array of roles
  const {roles: loggedUserRoles} = useAuthDetails();
  const content = Object.values(allowedRoles).find(
    (role) => {
      type TRole = Extract<TUserRoles, { type: typeof role }>;
      return loggedUserRoles.includes(role as TRole)
    }
  ) ? (
    <Outlet />
  ) : (
    <Navigate to={`/${routes.LOGIN}`} state={{ from: location }} replace />
  )
  
  return  content;
}

export default RequiredAuth
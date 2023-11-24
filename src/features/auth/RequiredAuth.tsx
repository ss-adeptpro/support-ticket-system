import { Navigate, Outlet, useLocation } from "react-router";
import useAuthDetails from "../../hooks/useAuthDetails";
import { routes } from "../../types/routes.types";
import { TUserRolesTypes } from "./auth.types";

type Props = {
  allowedRoles: TUserRolesTypes;
}

const RequiredAuth = ({allowedRoles}: Props) => {
  const location = useLocation();

  //could be multiple roles - so returning array of roles
  const {roles: loggedUserRoles} = useAuthDetails();

  console.log('loggedUserRoles ', loggedUserRoles);
    
  const result = Object.values(allowedRoles).find(
    (role) => loggedUserRoles.includes(role as string)
  );
  

  const content = Object.values(allowedRoles).find(
    (role) => loggedUserRoles.includes(role as string)
  ) ? (
    <Outlet />
  ) : (
    <Navigate to={`/${routes.LOGIN}`} state={{ from: location }} replace />
  )
  
  return  content;
}

export default RequiredAuth
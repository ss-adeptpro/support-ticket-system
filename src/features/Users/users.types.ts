import { TUserRolesTypes } from "../auth/auth.types"

export type TUser = {
  id : string,
  username: string,
  active: boolean,
  roles: TUserRolesTypes
}

export type TUsers = Array<TUser>
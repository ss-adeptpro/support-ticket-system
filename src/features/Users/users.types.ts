import { EntityId } from "@reduxjs/toolkit"
import { TUserRolesTypes } from "../auth/auth.types"

export type TUser = {
  id : string,
  username: string,
  active: boolean,
  roles: TUserRolesTypes
}

export type TUsers = Array<TUser>

export type TUserOptionsProps = {
  key: string,
  userId:string,
  userName:string
}

// Defined just for documentation purpose
export type TUserOptionData = any;

export type TUserDeleteDialogRef = {
  openDialog: (userId: string, userName:string) => void,
  closeDialog: () => void,
  deleteAlert : (isSuccess: boolean, message: string) => void
}

export type TUserDeleteDialogProps = {
  onUserDelete : (event:React.MouseEvent<HTMLElement>, userId:string) => void
}

export type TUserProps = {
  userId: string | number,
  onRowClick?: (event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>) => void,
  onActionsUserClicked?: (event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>, userName:string) => void
}
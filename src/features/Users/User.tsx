import { useAppSelector } from "../../store/app.hook"
import { AppState } from "../../store/store"
import { selectUserById } from "./usersApiSlice"
import userStyles from "./user.module.css";
import { memo, useState } from "react";
import { EntityId } from "@reduxjs/toolkit";

type TUserProps = {
  userId: string | number,
  onClick?: (event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>) => void
}

const User = (props: TUserProps) => {

  const user = useAppSelector((state:AppState) => selectUserById(state, props.userId))
  const userRoles = user?.roles.join(', ');
  const activeStatus = user?.active ? 'Active' : 'Inactive';

  return (
      <tr className={userStyles.userRow} onClick={(event) => props.onClick?.(event, props.userId)}>
        <td className={userStyles.userCell}>{user?.username}</td>
        <td className={userStyles.userCell}>{activeStatus}</td>
        <td className={userStyles.userCell}>{userRoles}</td>
        <td className={userStyles.userCell}>
          <span className="btn ml-2">Edit</span>
          <span className="btn ml-2">Details</span>
          <span className="btn ml-2">Delete</span>
        </td>
      </tr>
  )
}

//memoized user
const MemoizedUser = memo(User)
export default MemoizedUser
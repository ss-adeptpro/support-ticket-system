import { useAppSelector } from "../../store/app.hook"
import { AppState } from "../../store/store"
import { selectUserById } from "./usersApiSlice"
import userStyles from "./user.module.css";
import { memo } from "react";
import { EntityId } from "@reduxjs/toolkit";
import { TUserProps } from "./users.types";

//User component to show user details
const User = (props: TUserProps) => {

  const user = useAppSelector((state:AppState) => selectUserById(state, props.userId))
  const userRoles = user?.roles.join(', ');
  const activeStatus = user?.active ? 'Active' : 'Inactive';

  /*
  //display contextMenu on right click
  function handleContextMenu(event:React.MouseEvent){
    show({
      event,
      props: {
          key: 'value'
      }
    })
  }
*/
  return (
      <tr className={userStyles.userRow} onClick={(event) => props.onRowClick?.(event, props.userId)}>
        <td className={userStyles.userCell}>{user?.username}</td>
        <td className={userStyles.userCell}>{activeStatus}</td>
        <td className={userStyles.userCell}>{userRoles}</td>
        <td className={userStyles.userCell}>
          {/* Context Menu for options */}
              {/* <button className="btn" onContextMenu={handleContextMenu} onClick={onClickOptionsHandler}>Options</button> */}
              <button className="btn" 
                onClick={(event) => props.onActionsUserClicked?.(event, user?.id as Partial<EntityId>, user?.username as string)}
              >
                Actions
              </button>
        </td>
      </tr>
  )
}

//memoized user
const MemoizedUser = memo(User)
export default MemoizedUser
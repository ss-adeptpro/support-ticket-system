import { useAppSelector } from "../../store/app.hook"
import { AppState } from "../../store/store"
import { selectUserById } from "./usersApiSlice"
import userStyles from "./user.module.css";

type TUserId = {
  userId: string | number,
  onClick?: (event:React.MouseEvent) => void
}

const User = (props: TUserId) => {
  const user = useAppSelector((state:AppState) => selectUserById(state, props.userId))
  const userRoles = user?.roles.join(', ');
  const activeStatus = user?.active ? 'Active' : 'Inactive';

  return (
      // <tr className={userStyles.userRow} onClick={props.onClick}>
      <tr className={userStyles.userRow} onClick={props.onClick ?? undefined}>
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

export default User
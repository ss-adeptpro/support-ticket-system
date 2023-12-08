import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/app.hook";
import User from "./User";
import { useNavigate } from "react-router";
import { selectUserIds, useDeleteUserMutation, useGetUsersQuery } from "./usersApiSlice"
import userStyles from "./user.module.css";
import { useCallback, useRef } from "react";
import useApiError from "../../hooks/useApiError";
import { Menu, Item, Separator, Submenu, useContextMenu, ItemParams } from 'react-contexify';
import 'react-contexify/ReactContexify.css';

import UserDeleteDialog from "./UserDeleteDialog";
import { TUserDeleteDialogRef, TUserOptionData, TUserOptionsProps } from "./users.types";
import { isApiResponse } from "../../helpers/api.error.util";
import { USER_DELETE_FAILURE, USER_DELETE_SUCCESS } from "./users.constants";


//Users Component to list users
const Users = () => {
  
  const navigate = useNavigate();

  //Open the dialog from parent (so to have only one instance of dialog)
  const userDeleteDialogRef = useRef<TUserDeleteDialogRef>(null);

  //fetch all users
  const {
    isFetching, isSuccess, isError, error
  } = useGetUsersQuery();
  
  const orderedUserIds = useAppSelector(selectUserIds);

  const [
		deleteUser
	] = useDeleteUserMutation();
  
  const errMsg = useApiError(error);
  // memoized callback to avoid re-rendering of child component (<user/>)
  // redirect to user details page
  const gotoUserDetailsPage = useCallback((event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>) : void => {
    event.stopPropagation();
    navigate(`/users/${userId}`);
  }, []);   //function will never be recreated as empty array is passed


  /* SStart --- Context menu */
  //##################################
      const MENU_ID = `user_options`;
      const { show } = useContextMenu({
        id: MENU_ID,
      });      
      
      //open menu on left click of 'actions' button
      const onActionsUserClickedHandler = useCallback((event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>, userName:string) : void => {
        event.stopPropagation();    
        if (event.type === 'click') {
          show({
            event,
            props: {
                key: 'value',
                userId: userId,
                userName
            }
          })
        }
      }, []);   //function will never be recreated as empty array is passed
      
      //when user clicks on the different options given in action's context menu
      const handleContextMenuItemClick = ({ id, event, props, data, triggerEvent }: ItemParams<TUserOptionsProps, TUserOptionData>) => {
        switch (id) {
          case "userDetails":
            navigate(`/users/${props?.userId}`);
            break;
          case "userTickets":
            console.log(id, event, props)
            break;
          case "userDelete":
            console.log(id, event, props);
            userDeleteDialogRef.current?.openDialog(props?.userId as string,  props?.userName as string)
            break;
          case "userEdit":
            console.log(id, event, props)
            break;
        }
      }      

  //####################################
  /* EEND --- Context menu */


  //####################################
  /* SSTART --- user actions */
  
  /**
   * Delete a user
   * @param event 
   * @param userId string
   */
  const onUserDeleteHandler = async (event:React.MouseEvent<HTMLElement>, userId:string) => {
    event.stopPropagation();
    try {
      await deleteUser({id: userId}).unwrap();
      userDeleteDialogRef.current?.deleteAlert(true, USER_DELETE_SUCCESS);
    } catch (deleteError: unknown) {
      const deleteErrorMsg = isApiResponse(deleteError) ? deleteError?.data?.message : '';
      const errMsg =  USER_DELETE_FAILURE + ' ' + deleteErrorMsg;
      userDeleteDialogRef.current?.deleteAlert(false, errMsg);
    }
  }

  /* EEND --- user actions */
  //####################################  
  
  let content;
  //<div className="btn cursor-pointer" onClick={refetch}>Reload Users</div>
	if (isFetching) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{errMsg} </p>;
	if (isSuccess) {

    //menu options
    const contextMenu = (
      <Menu id={MENU_ID} theme="sts" className={userStyles.stsContextMenu}>
        <Item id="userEdit" onClick={handleContextMenuItemClick}>Edit</Item>
        <Item id="userDelete" onClick={handleContextMenuItemClick}>Delete</Item>
        <Separator />
        {/* <Item disabled>Disabled</Item>
        <Separator /> */}
        <Submenu label="Details">
          <Item id="userDetails" onClick={handleContextMenuItemClick}>User's Details</Item>
          <Item id="userTickets" onClick={handleContextMenuItemClick}>User's Tickets</Item>
        </Submenu>
      </Menu>
    )

    /* Due to entityAdapter in slice - 
      data returned is in format: {entities, ids}
    */
    const usersContent =
      orderedUserIds?.length && 
      orderedUserIds.map((userId: Partial<EntityId>) => 
        <User key={userId} userId={userId} onRowClick = {gotoUserDetailsPage} onActionsUserClicked = {onActionsUserClickedHandler} />
      );

      content = (
        <div className="flex items-center justify-center w-3/4">
          <UserDeleteDialog ref={userDeleteDialogRef} onUserDelete = {onUserDeleteHandler} />
          {contextMenu}
          <table className="text-sm border-separate border-spacing-y-2 w-full">
            <thead className="">
              <tr>
                <th className={userStyles.headingCol}>Name</th>
                <th className={userStyles.headingCol}>Status</th>
                <th className={userStyles.headingCol}>Roles</th>
                <th className={userStyles.headingCol}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersContent}
            </tbody>
          </table>
        </div>
      )
  }
    
  return (
    <>
      {content}
    </>
  )
}

export default Users
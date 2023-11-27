import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/app.hook";
import User from "./User";
import { useNavigate } from "react-router";
import { selectUserIds, useGetUsersQuery } from "./usersApiSlice"
import userStyles from "./user.module.css";
import { useCallback } from "react";

const Users = () => {
  const navigate = useNavigate();

  //assign a default empty array to data in case it's undefined, and we always have an array to sort on
  const {
    data : usersData = [], isFetching, isSuccess, isError, error, refetch
  } = useGetUsersQuery();

  const orderedUserIds = useAppSelector(selectUserIds)
  
  // memoized callback to avoid re-rendering of child component (<user/>)
  const onRowClickHandler = useCallback((event:React.MouseEvent<HTMLElement>, userId:Partial<EntityId>) : void => {
    event.stopPropagation();
    navigate(`/users/${userId}`);
  }, []);   //function will never be recreated as empty array is passed
  

  let content;
  //<div className="btn cursor-pointer" onClick={refetch}>Reload Users</div>
	if (isFetching) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{error?.data.message} </p>;
	if (isSuccess) {
    const usersContent =
      orderedUserIds?.length && 
      orderedUserIds.map((userId: Partial<EntityId>) => 
        <User key={userId} userId={userId} onClick = {onRowClickHandler}/>
      );

      content = (

        <div className="flex items-center justify-center w-3/4">
          <table className="text-sm border-separate border-spacing-y-2 w-full">
            <thead className="">
              <tr>
                <th className={userStyles.headingCol}>Name</th>
                <th className={userStyles.headingCol}>Status</th>
                <th className={userStyles.headingCol}>Roles</th>
                <th className={userStyles.headingCol}>Options</th>
              </tr>
            </thead>
            <tbody>
              {usersContent}
            </tbody>
          </table>
        </div>
      )
  }
  /*
  Due to entityAdapter in slice - 
  data returned is in format: {entities, ids}
  */
  
  return (
    <>
      {content}
    </>
  )
}

export default Users
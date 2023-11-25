import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../../store/app.hook";
import User from "./User";
import { useNavigate } from "react-router";
import { selectUserIds, useGetUsersQuery } from "./usersApiSlice"
import userStyles from "./user.module.css";

const Users = () => {

  const navigate = useNavigate();

  //assign a default empty array to data in case it's undefined, and we always have an array to sort on
  const {
    data : usersData = [], isFetching, isSuccess, isError, error, refetch
  } = useGetUsersQuery();

  const orderedUserIds = useAppSelector(selectUserIds)

  //navigate to user details page
  const onRowClickHandler = (event:React.MouseEvent, userId:Partial<EntityId>) => {
    event.stopPropagation();
    navigate(`/users/${userId}`);
  }

  let content;
  //<div className="btn cursor-pointer" onClick={refetch}>Reload Users</div>
	if (isFetching) content = <h1>Loading...</h1>;
	if (isError) content = <p> Error:{error?.data.message} </p>;
	if (isSuccess) {
    const usersContent =
      orderedUserIds?.length && 
      orderedUserIds.map((userId: Partial<EntityId>) => 
        <User key={userId} userId={userId} onClick = {(event) => onRowClickHandler(event, userId)}/>
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
        
        
        // <div className="flex flex-col gap-4 w-[400px] justify-start capitalize">
        //   <div className="usersHeader grid grid-cols-4 gap-4">
        //     <span className="w-2/3 border border-cyan-950 p-2">UserName</span>
        //     <span className=" w-2/12  border border-cyan-950  p-2">Status</span>
        //     <span className=" w-2/6 border border-cyan-950  p-2">Roles</span>
        //     <span className=" w-2/6 border border-cyan-950  p-2">Options</span>
        //     </div>
        //     <div className="usersData grid grid-cols-4 gap-4 capitalize">
        //       {usersContent}
        //     </div>
        // </div>

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
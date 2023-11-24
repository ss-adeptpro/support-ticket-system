import { useGetUsersQuery } from "./usersApiSlice"

const Users = () => {
  const {
    data : users = [], isFetching, isSuccess, isError, error, status
  } = useGetUsersQuery();
  
  console.log(users)
  let content;
  if (isError) content = <p> Error:{error?.data?.message} </p>;
  return (
    <>
    {content}
    </>
  )
}

export default Users
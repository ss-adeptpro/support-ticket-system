import { useNavigate } from "react-router";
import { useOnLogoutMutation } from "../../features/auth/authApiSlice";
import CustomLink from "../CustomLink"
import useAuthDetails from "../../hooks/useAuthDetails";

const Header = () => {
  const [logout, { isSuccess, isError, isLoading, error }] =	useOnLogoutMutation();
  const {isUser} = useAuthDetails();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout()
      .unwrap();  //to catch errors, if any
      navigate("/home") //go to home page after logout
    } catch (err) {
      console.log('Header err ', err);
    }
  }  

  return (
    <div className="p-2 flex gap-4 items-center justify-between bg-red-400 text-white">
      <div className="logo">
        <CustomLink to="/" className="font-bold text-2xl flex flex-col items-center">
          <span>Incident Support</span>
          <span className="text-xl ">System</span>
        </CustomLink>
      </div>
      <div className="navLinks flex gap-4 items-center flex-1 justify-end">
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/aboutus">Aboutus</CustomLink>

        {isUser && (
          <>
            <CustomLink to="/dashboard/users">Users</CustomLink>
            <CustomLink to="/dashboard/tickets">Tickets</CustomLink>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
          </>
        )}
      </div>
      <div className="rightHeader flex gap-4 items-center flex-1 justify-end">
        {!isUser && 
          (<>
            <CustomLink to="/login" className="btn">Login</CustomLink>
            <CustomLink to="/register" className="btn">Register</CustomLink>
          </>)
        }

        {isUser && (<button className="btn" onClick={() => logoutHandler()}>Logout</button>)}
      </div>
    </div>
  )
}

export default Header
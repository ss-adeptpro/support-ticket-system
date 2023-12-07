import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/app.hook";
import { useLoginMutation } from "../auth/authApiSlice";
import useApiError from "../../hooks/useApiError";

//TODO: error message
const Login = () => {
  const [login, response ] = useLoginMutation();
  const {data: loginResponse, error: loginError, isError: isLoginError, isLoading, isSuccess} = response;  

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //CORS:                 err is       {status: 'FETCH_ERROR', error: 'TypeError: Failed to fetch'}
  //CORS invalid origin:  response is  data: {message: 'Not allowed by CORS'}

  //e:React.MouseEvent<HTMLButtonElement>
  const loginHandler = async () => {
    try {
      const { accessToken } = await login({
        username: 'sandeep',
        password: 'hello'
      })
      .unwrap();  //to catch errors, if any
      //dispatch this action either from here or from authSlice
      //dispatch(setCredentials({ accessToken }));
      
      //go to dashboard page
      navigate("/dashboard");
    } catch (err) {
      //console.log('login error ', err);
    }
  }
  return (
    <>
    <button className="btn" onClick={loginHandler}>Login</button>
    </>
  )
}

export default Login
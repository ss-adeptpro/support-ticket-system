const Register = () => {

  const registerHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
    console.log(e)
  }

  return (
    <>
    <button className="btn" onClick={ (e) => registerHandler(e)}>Register</button>
    </>
  )
}

export default Register
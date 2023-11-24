import useAuthDetails from "../../hooks/useAuthDetails"

const DashboardHeader = () => {
  const { username, status } = useAuthDetails()
	//useTitle(`Order Tickets for ${username}`)
	const date = new Date()
	const today = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
		timeStyle: 'long',
	}).format(date)

  return (
    <>
      <div className="flex w-full items-center text-center justify-center capitalize gap-5">
        <span className="text-xl font-bold">Welcome {username}</span><span>Status: {status}</span>
      </div>
    </>
  )
}

export default DashboardHeader
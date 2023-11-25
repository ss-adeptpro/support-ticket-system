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
      <div className="flex items-center justify-end capitalize gap-5 mb-3 w-full px-3">
        <span className="text-xl font-bold">Welcome {username}</span><span>Status: {status}</span>
      </div>
    </>
  )
}

export default DashboardHeader
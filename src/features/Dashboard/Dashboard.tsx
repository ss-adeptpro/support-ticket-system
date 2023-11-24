// import from "./dash.module.css";
import { useNavigate } from "react-router";
import dashStyles from "./dash.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const onNewTicketClicked = () => navigate('/dashboard/tickets/new');
	const onNewUserClicked = () => navigate('/dashboard/users/new');
	const onTicketsClicked = () => navigate('/dashboard/tickets');
	const onUsersClicked = () => navigate('/dashboard/users');

  return (
    <div className={dashStyles.dashContainer}>
      <div className=" text-2xl font-bold">Better ticketing system for your team and your customers</div>
      <div className="flex gap-4">
        <div className={dashStyles.dashItem} onClick={()=> onUsersClicked()}>
          View Users
        </div>
        <div className={dashStyles.dashItem} onClick={()=> onTicketsClicked()}>
          View Tickets
        </div>
        <div className={dashStyles.dashItem} onClick={()=> onNewTicketClicked()}>
          Add new ticket
        </div>
        <div className={dashStyles.dashItem} onClick={()=> onNewUserClicked()}>
          Add new user
        </div>
      </div>
    </div>
  )
}

export default Dashboard
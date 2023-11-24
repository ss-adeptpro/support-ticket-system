import { Outlet } from "react-router"
import DashboardHeader from "./DashboardHeader"

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  )
}

export default DashboardLayout
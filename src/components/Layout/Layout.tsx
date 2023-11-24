import { Outlet } from "react-router"
import Header from "../Header"
import Footer from "../Footer"

const Layout = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Header />
      <div className="sectionContainer">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
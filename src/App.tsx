import { Routes, Route } from "react-router";
import Layout from './components/Layout';
import Home from './features/Home';
import Register from "./features/Register";
import Login from "./features/Login";
import Users from "./features/Users";
import Tickets from "./features/Tickets";
import Logout from "./features/Logout";
import Dashboard from "./features/Dashboard";
import RequiredAuth from "./features/auth/RequiredAuth";
import { routes } from "./types/routes.types";
import { admins, allUsers } from "./features/auth/auth.types";
import DashboardLayout from "./features/Dashboard/DashboardLayout";
import Aboutus from "./features/Dashboard/Aboutus";

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/*' element={<Layout />}>
          {/* public routes */}
            <Route index element={<Home />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.ABOUTUS} element={<Aboutus />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />

          {/* protected routes */} - all loggedin users
            <Route element={<RequiredAuth allowedRoles={allUsers} />}>
              {/* suffix /* will show dashboardLayout even for unknown pages like http://localhost:5173/dashboard/unknownPage */}
              <Route path={`${routes.DASHBOARD}/*`} element={<DashboardLayout />}>
                <Route index element={<Dashboard />}></Route>
                <Route
                    element={
                      <RequiredAuth allowedRoles={admins} />
                    }>
                  <Route path={routes.USERS} element={<Users />} />
                  <Route path={routes.TICKETS} element={<Tickets />} />
                </Route>

                <Route path={routes.LOGOUT} element={<Logout />} />
              </Route>
            </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

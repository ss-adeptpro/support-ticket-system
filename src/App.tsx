import { Routes, Route } from "react-router";
import Layout from './components/Layout';
import Home from './features/Home';
import Register from "./features/Register";
import Login from "./features/Login";
import RequiredAuth from "./features/auth/RequiredAuth";
import { routes } from "./types/routes.types";
import { admins, allUsers } from "./features/auth/auth.types";

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/*' element={<Layout />}>
          {/* public routes */}
            <Route index element={<Home />} />
            <Route path={routes.HOME} element={<Home />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTER} element={<Register />} />

          {/* protected routes */} - all loggedin users
            <Route element={<RequiredAuth allowedRoles={allUsers} />}>
              
            </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

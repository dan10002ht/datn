import Employees from "../pages/Employees";
import Home from "../pages/Home";
import TimeKeeping from "../pages/TimeKeeping";
import NotFound from "../pages/NotFound";
import Request from "../pages/Request";
import Login from "../pages/Login/Login";

export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/personnel/employees",
    component: Employees,
  },
  {
    path: "/working-day/timekeeping",
    component: TimeKeeping,
  },
  {
    path: "/request",
    component: Request,
  },
  // {
  //   path: "/login",
  //   component: Login,
  // },
  {
    path: "*",
    component: NotFound,
  },
];

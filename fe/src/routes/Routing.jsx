import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import defaultRoutes from "./defaultRoutes";
import AppLayout from "../layouts/AppLayout/AppLayout";
import Login from "../pages/Login/Login";

const Routing = ({ prefix = "" }) => {
  const routeGroups = [...defaultRoutes];

  return (
    <Router>
      <Routes>
        <Route path="/login" Component={Login}></Route>

        <Route
          element={
            <AppLayout>
              <Outlet />
            </AppLayout>
          }
        >
          {routeGroups.map((group, index) => (
            <Route
              key={index}
              path={`${prefix}${group.path}`}
              Component={group.component}
            ></Route>
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;

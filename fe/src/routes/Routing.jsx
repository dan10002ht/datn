import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import defaultRoutes from "./defaultRoutes";
import AppLayout from "../layouts/AppLayout/AppLayout";

const Routing = ({ prefix = "" }) => {
  const routeGroups = [...defaultRoutes];

  return (
    <Router>
      <AppLayout>
        <Routes>
          {routeGroups.map((group, index) => (
            <Route
              key={index}
              path={`${prefix}${group.path}`}
              Component={group.component}
            ></Route>
          ))}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default Routing;

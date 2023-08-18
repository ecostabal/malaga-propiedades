import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Home } from "../home/Home.jsx";
import { Team } from "../pages/Team"
import { LogRegister } from "../pages/LogRegister"
import { NotFound } from "../pages/NotFound";

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />}/>
    <Route path={RoutePaths.TEAM} element={<Team />}/>
    <Route path={RoutePaths.LOGIN} element={<LogRegister />}/>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoutePaths } from "./RoutePaths";
import { Home } from "../home/Home.jsx";
import { Conversemos } from "../pages/Conversemos"
import { LogRegister } from "../pages/LogRegister"
import { NotFound } from "../pages/NotFound";
import Propiedades from "../pages/Propiedades"
import PropertyDetailPage from "../pages/PropertyDetailPage"; // Asegúrate de que la ruta sea correcta

export const Router = () => (
  <Routes>
    <Route path={RoutePaths.HOME} element={<Home />} />
    <Route path={RoutePaths.CONVERSEMOS} element={<Conversemos />}/>
    <Route path={RoutePaths.PROPIEDADES} element={<Propiedades />}/>
    <Route path={`${RoutePaths.PROPERTY_DETAIL}/:propertyId`} element={<PropertyDetailPage />} />
    <Route path={RoutePaths.LOGIN} element={<LogRegister />}/>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

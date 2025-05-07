import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import Login from "../views/Login";
import { AuthGuard } from "../guards/AuthGuard";
import { GuestGuard } from "../guards/GuestGuard";
import { DashboardLayout } from "../layouts/DashboardLayout";
import React from "react";
import { RouteType } from "../types";

export const routes: RouteType[] = [
  {
    path: "/",
    element: Dashboard,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: "/login",
    element: Login,
    guard: GuestGuard,
  },
];

export const renderRoutes = (routes: RouteType[]) => {
  return (
    <Routes>
      {routes.map((route, index: number) => {
        const { path, element: Component } = route;
        const Layout = route.layout || React.Fragment;
        const Guard = route.guard || React.Fragment;
        return (
          <Route
            key={index}
            path={path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
};

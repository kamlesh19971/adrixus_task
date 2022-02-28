import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, ro, NavLink } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import SignUp from "./pages/singup";
import Logout from "./pages/logout";

const Router = (props) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const path = window.location.pathname;

    if (!token || token === "") {
      if (!["/login", "/signup"].includes(path))
        window.location.href = "/login";
    } else {
      if (path !== "/dashboard") window.location.href = "/dashboard";
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="*"
          element={
            <h3>
              <span className="text-danger"> Page Not Found </span>
              <NavLink to={"/dashboard"}>Click Here</NavLink>
            </h3>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

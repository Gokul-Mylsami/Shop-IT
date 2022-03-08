import React, { Fragment } from "react";
import { Route, Routes, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../user/Login";
import Profile from "../user/Profile";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);
  console.log(isAuthenticated, loading, user);
  if (isAuthenticated === true && loading === false) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
  // console.log(children);
};

export default ProtectedRoute;

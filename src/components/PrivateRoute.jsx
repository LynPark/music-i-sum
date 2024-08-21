import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;

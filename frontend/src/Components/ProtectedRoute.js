import React from "react";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component }) {
	const user = JSON.parse(sessionStorage.getItem("user"));
	if (!user) return <Navigate to="/login" />;
	return Component;
}

export default ProtectedRoute;

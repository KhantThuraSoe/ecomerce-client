import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ user, children }) => {
	if (!user) return <Navigate to="/login" />;
	return children;
};

const AdminProtectedRoute = ({ admin, children }) => {
	if (!admin) return <Navigate to="/admin_login" />;
	return children;
};
export { ProtectedRoute, AdminProtectedRoute };

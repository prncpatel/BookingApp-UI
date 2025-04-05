import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("token");
    console.log(isAuthenticated);

    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
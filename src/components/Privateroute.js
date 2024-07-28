import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PrivateRoute = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        localStorage.getItem("isLoggedIn")
            ? <Outlet />
            :
            <>
                <Navigate to="/login" state={{ from: location }} replace />
            </>

    );
}

export default PrivateRoute;
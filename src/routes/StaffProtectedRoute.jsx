import { Navigate, Outlet } from "react-router-dom";
import { getStaffSession } from "../utils/storage";

const StaffProtectedRoute = () => {
  const session = getStaffSession();

  if (!session) {
    return <Navigate to="/staff/login" replace />;
  }

  return <Outlet />;
};

export default StaffProtectedRoute;

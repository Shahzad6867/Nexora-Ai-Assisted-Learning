import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import type { CustomJwtPayload } from "./pages/auth/Login.page";

export function RestrictRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    if (entity.role === "student") {
      return <Navigate to="/" replace />;
    } else if (entity.role === "institution") {
      return <Navigate to="/institution/dashboard" replace />;
    } else if (entity.role === "instructor") {
      return <Navigate to="/instructor/dashboard" replace />;
    } else if (entity.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }
  return children;
}

import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import type { CustomJwtPayload } from "./pages/auth/Login.page";
import type { RootState } from "./app/store";
import { useSelector } from "react-redux";

export function RestrictStudentRoute({ children }) {
  const {token} = useSelector((state : RootState) => state.auth)
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    if (entity.role !== "student") {
      return <Navigate to={`/${entity.role}/dashboard`} replace />;
    }
  }
  return children;
}

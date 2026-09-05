import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import type { CustomJwtPayload } from "./pages/auth/Login.page";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";

export function RestrictAdminRoute({ children }) {
  const {token} = useSelector((state : RootState) => state.auth)
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    if (entity.role !== "admin") {
      if(entity.role === "student"){
      return <Navigate to="/" replace />;
      }else{
       return <Navigate to={`/${entity.role}/dashboard`} replace />;
      }
    } 
  }
  return children;
}

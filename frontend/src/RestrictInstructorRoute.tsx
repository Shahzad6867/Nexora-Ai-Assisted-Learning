import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import type { CustomJwtPayload } from "./pages/auth/Login.page";

export function RestrictInstructorRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    if (entity.role !== "instructor") {
      if(entity.role === "student"){
      return <Navigate to="/" replace />;
      }else{
       return <Navigate to={`/${entity.role}/dashboard`} replace />;
      }
    } 
  }
  return children;
}

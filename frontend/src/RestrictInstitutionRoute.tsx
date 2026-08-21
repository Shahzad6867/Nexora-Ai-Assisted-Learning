import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import type { CustomJwtPayload } from "./pages/auth/Login.page";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./app/store";
import { fetchEntities } from "./features/institutionSlice";

export function RestrictInstitutionRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    if (entity.role !== "institution") {
      if(entity.role === "student"){
      return <Navigate to="/" replace />;
      }else{
       return <Navigate to={`/${entity.role}/dashboard`} replace />;
      }
    } 
  }
  return children;
}



import { useNavigate } from "react-router";
import type { CustomJwtPayload } from "./Login.page";
import { jwtDecode } from "jwt-decode";
import LoadingPage from "../Loader/Loading.page";

export default function logout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (token) {
    const entity = jwtDecode(token) as CustomJwtPayload;
    localStorage.removeItem("token");
    navigate(`/${entity.role}/login`);
  }
}

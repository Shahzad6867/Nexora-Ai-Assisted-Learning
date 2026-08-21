import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router'
import type { CustomJwtPayload } from './pages/auth/Login.page';

export function ProtectRoute({children}){
    const token = localStorage.getItem("token")
    if(!token){
          return <Navigate to="/" replace />
    } 
  return children
}

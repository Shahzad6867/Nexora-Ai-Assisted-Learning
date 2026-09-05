
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import type { RootState } from './app/store'

export function ProtectRoute({children}){
  const {token} = useSelector((state : RootState) => state.auth)
    if(!token){
          return <Navigate to="/" replace />
    } 
  return children
}

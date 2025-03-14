import { Navigate, Outlet } from "react-router-dom"

export const PrivateGuard = () => {
    
    const token = localStorage.getItem("access_token")
    const authenticated = false;

    return  token ? <Outlet/> : <Navigate to="/login" replace/>
}
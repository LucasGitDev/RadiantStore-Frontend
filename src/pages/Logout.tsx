import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
    useEffect(() => {
      sessionStorage.removeItem(import.meta.env.VITE_WEB_STORAGE_ID);
    }, []);
  return <Navigate to="/auth/login" />;
}

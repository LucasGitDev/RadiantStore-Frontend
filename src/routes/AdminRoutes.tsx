import { Outlet, Navigate } from 'react-router-dom';
import { isAdmin } from '../utils/auth';

const AdminRoutes = () => {
  return isAdmin() ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;

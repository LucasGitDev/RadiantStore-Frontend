import { Outlet, Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

const PrivateRoutes = () => {
  let token = getAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

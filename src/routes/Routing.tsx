import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomDrawer from '../components/CustomDrawer';
import { useDrawerContext } from '../contexts/DrawerContext';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Logout from '../pages/Logout';
import PrivateRoutes from './PrivateRoutes';

function Routing() {

  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Home',
      },
      {
        icon: 'logout',
        path: '/logout',
        label: 'Logout',
      }
    ]);
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<CustomDrawer children={<Cart/>} />} path="/cart" />
        </Route>
        {['/', '/home'].map((path, i) => (
          <Route key={i} element={<CustomDrawer children={<Home/>} />} path={path} />
        ))}
        {['/auth/register', '/auth/login'].map((path, i) => (
          <Route key={i} element={<Auth />} path={path} />
        ))}
        <Route element={<Logout />} path="/logout" />
        <Route element={<Navigate to="/home" />} path="*" />
      </Routes>
    </Router>
  );
}

export default Routing;

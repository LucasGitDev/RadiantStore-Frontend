import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomDrawer from '../components/CustomDrawer';
import { useDrawerContext } from '../contexts/DrawerContext';
import AddSkinPage from '../pages/Admin/AddSkinPage';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import ConfirmEmail from '../pages/ConfirmEmail';
import Home from '../pages/Home';
import Logout from '../pages/Logout';
import { isAdmin } from '../utils/auth';
import AdminRoutes from './AdminRoutes';
import PrivateRoutes from './PrivateRoutes';

function Routing() {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    const drawerOptions = [
      {
        icon: 'home',
        path: '/',
        label: 'Home',
      },
      isAdmin()
        ? {
            icon: 'add',
            path: '/admin/add-skin',
            label: 'Nova Skin',
          }
        : undefined,
      {
        icon: 'logout',
        path: '/logout',
        label: 'Logout',
      },
    ];
    setDrawerOptions(drawerOptions.filter((option) => option !== undefined) as any);
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<CustomDrawer children={<Cart />} />} path="/cart" />
        </Route>

        <Route element={<AdminRoutes />}>
          <Route element={<CustomDrawer children={<AddSkinPage />} />} path="/admin/add-skin" />
        </Route>

        {['/auth/register', '/auth/login'].map((path, i) => (
          <Route key={i} element={<Auth />} path={path} />
        ))}
        <Route element={<Logout />} path="/logout" />
        <Route element={<ConfirmEmail />} path="/confirm-email/:token" />
        <Route element={<CustomDrawer children={<Home />} />} path={'/'} />
      </Routes>
    </Router>
  );
}

export default Routing;

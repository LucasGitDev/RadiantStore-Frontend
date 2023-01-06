import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from '../pages/Auth';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import PrivateRoutes from './PrivateRoutes';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Cart />} path="/cart" />
        </Route>
        <Route element={<Auth />} path="/auth/register" />
        <Route element={<Auth />} path="/auth/login" />
        <Route element={<Home />} path="/" />
      </Routes>
    </Router>
  );
}

export default Routing;

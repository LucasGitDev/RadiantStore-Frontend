import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PrivateRoutes from './PrivateRoutes';

function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Cart />} path="/cart" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Home />} path="/" />
      </Routes>
    </Router>
  );
}

export default Routing;

import './App.css';
import HomePage from './pages/HomePage';
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ProductInfo from "./pages/ProductInfo";
import RegisterPage from "./pages/RegisterPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import {Route, BrowserRouter, Routes, Navigate} from 'react-router-dom';
import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from 'react-toastify';


import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
      <ToastContainer></ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoutes>
                <HomePage></HomePage>
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/productinfo/:productid"
            exact
            element={
              <ProtectedRoutes>
                <ProductInfo></ProductInfo>
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path="/cart"
            exact
            element={
              <ProtectedRoutes>
                <CartPage></CartPage>
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/orders"
            exact
            element={
              <ProtectedRoutes>
                <OrderPage></OrderPage>
              </ProtectedRoutes>
            }
          ></Route>

          <Route
            path="/admin"
            exact
            element={
              <ProtectedRoutes>
                <AdminPage></AdminPage>
              </ProtectedRoutes>
            }
          ></Route>

          <Route path="/login" exact element={<LoginPage />}></Route>
          <Route path="/register" exact element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export const ProtectedRoutes = ({children}) => {
  if(localStorage.getItem('currentUser')){
    return children;
  }
  else{
    return <Navigate to="/login"></Navigate>
  }
}

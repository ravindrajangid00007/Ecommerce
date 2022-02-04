import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header/Header';
import Footer from './components/layouts/Footer/Footer';
import Home from './components/Home/Home';
import Loader from './components/layouts/Loader/Loader';
import ProductDetails from './components/Product/ProductDetails.js';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import store from './state/store';
import { loadUser } from './state/action-creators/userAction.js';
import UserOptions from './components/layouts/Header/UserOptions.js';
// import ProtectedRoute from "./components/Route/ProtectedRoute.js";
import Profile from "./components/User/Profile";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from './components/Cart/Payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js";
import MyOrders from "./components/Order/MyOrders.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from './components/Admin/UpdateProduct.js';
import OrderList from "./components/Admin/OrderList.js";
import UpdateOrder from "./components/Admin/UpdateOrder.js";
import UserList from "./components/Admin/UserList.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
// import {ReactNavbar} from "overlay-navbar"

function App() {
  const { isAuthenticated, user } = useSelector(state => state.userReducer);
  const [stripeApiKey, setStripeApiKey] = useState("");
  
  const getStripeApiKey = async () => {
    const { data } =await axios.get("/api/v1/payment/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  React.useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        {isAuthenticated && <Route path="/account" element={<Profile />} />}
        {isAuthenticated && <Route path="/me/update" element={<UpdateProfile />} />}
        {isAuthenticated && <Route path="/update-password" element={<UpdatePassword />} />}
        <Route path="/forgot-password" element={< ForgotPassword />} />
        <Route path="/reset-password/:token" element={< ResetPassword />} />
        <Route path="/cart" element={< Cart />} />
        {isAuthenticated && <Route path="/shipping" element={< Shipping />} />}
        {isAuthenticated && <Route path="/confirm-order" element={< ConfirmOrder />} />}

        {stripeApiKey && (
          <Route path="/process-payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                < Payment />
              </Elements>
            }
          />
        )}
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/my-all-orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/product" element={<NewProduct />} />
        <Route path="/admin/product/:id" element={<UpdateProduct />} />
        <Route path="/admin/order/:id" element={<UpdateOrder />} />
        <Route path="/admin/orders" element={<OrderList />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/user/:id" element={<UpdateUser />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

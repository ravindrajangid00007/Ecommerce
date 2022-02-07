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
import SearchBar from './components/layouts/Header/SearchBar';
import NotFound from './components/layouts/NotFound/NotFound.js';
import ProtectedRoute from './components/Route/ProtectedRoute.js';
function App() {
  const { isAuthenticated, user } = useSelector(state => state.userReducer);
  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/payment/stripeapikey");
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
        <Route path="/login" element={<LoginSignUp />} />


        <Route path="/account" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
        </Route>

        <Route path="/me/update" element={<ProtectedRoute />} >
          <Route path="/me/update" element={<UpdateProfile />} />
        </Route>

        <Route path="/update-password" element={<ProtectedRoute />} >
          <Route path="/update-password" element={< UpdatePassword />} />
        </Route>
        <Route path="/forgot-password" element={<ProtectedRoute />} >
          <Route path="/forgot-password" element={< ForgotPassword />} />
        </Route>
        <Route path="/reset-password/:token" element={<ProtectedRoute />} >
          <Route path="/reset-password/:token" element={< ResetPassword />} />
        </Route>

        <Route path="/cart" element={< Cart />} />

        <Route path="/shipping" element={<ProtectedRoute />} >
          <Route path="/shipping" element={< Shipping />} />
        </Route>
        <Route path="/confirm-order" element={<ProtectedRoute />} >
          <Route path="/confirm-order" element={< ConfirmOrder />} />
        </Route>


        {stripeApiKey && (
          <Route path="/process-payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                < Payment />
              </Elements>
            }
          />
        )}


        <Route path="/success" element={<ProtectedRoute />} >
          <Route path="/success" element={<OrderSuccess />} />
        </Route>
        <Route path="/my-all-orders" element={<ProtectedRoute />} >
          <Route path="/my-all-orders" element={<MyOrders />} />
        </Route>
        <Route path="/order/:id" element={<ProtectedRoute />} >
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/admin/products" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/products" element={<ProductList />} />
        </Route>

        <Route path="/admin/product" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/product" element={<NewProduct />} />
        </Route>
        <Route path="/admin/product/:id" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
        </Route>
        <Route path="/admin/order/:id" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/order/:id" element={<UpdateOrder />} />
        </Route>
        <Route path="/admin/orders" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/orders" element={<OrderList />} />
        </Route>
        <Route path="/admin/users" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/users" element={<UserList />} />
        </Route>
        <Route path="/admin/user/:id" element={<ProtectedRoute isAdmin={true} />} >
          <Route path="/admin/user/:id" element={<UpdateUser />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoImage from '../../../images/canvaLogo.jpeg';
import { loadUser } from '../../../state/action-creators/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar.js';
import './Header.css';
import HamburgerMenu from 'react-hamburger-menu';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);

  useEffect(() => {
    // const getOptions = async () => {
    //   const { data } = await axios.get('/api/v1/admin/all-products');
    //   setOptions(data.product);
    // }
    // getOptions();
    dispatch(loadUser);
  }, [dispatch]);

  return (
    <>
      <div className="navbar-back">
        <div className="navbar-container">
          <div className="side-space"></div>
          <div className="main-container">
            <Link to="/">
              <div className="nav-logo-container">
                <img src={LogoImage} alt="E-Commerce" />
              </div>
            </Link>

            <SearchBar />
            <div className={showHamburgerMenu ? "profile-cart mobile-profile-cart " : "profile-cart"}>      
              <div className="login-profile">
                {isAuthenticated == true ? (<div>
                  <Link to="/account">{user.name}</Link>
                </div>)
                  : (<div>
                    <Link to="/login">Login/Register</Link>
                  </div>)
                }
              </div>
              <div className="cart-icon">
                <Link to="/cart">
                  <p className="cart-item-count">
                    {cartItems.length}
                  </p>
                  <ShoppingCartIcon className="shopping-cart-icon" />
                </Link>
              </div>
            </div>
            <HamburgerMenu
              className="ham-burger-menu"
              isOpen={showHamburgerMenu}
              menuClicked={(e) => { setShowHamburgerMenu(!showHamburgerMenu) }}
              width={28}
              height={20}
              strokeWidth={3}
              rotate={0}
              color='white'
              borderRadius={5}
              animationDuration={0.5}
            />
          </div>
          <div className="side-space"></div>
        </div>
      </div>
    </>
  );
}

export default Header;

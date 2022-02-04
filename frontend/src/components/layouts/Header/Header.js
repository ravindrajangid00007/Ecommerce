import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  FormControl,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Container,
} from "react-bootstrap";
import { BsCart3 } from "react-icons/bs";
import LogoImage from '../../../images/photo-1557053964-937650b63311.jpg';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { loadUser } from '../../../state/action-creators/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Autocomplete from 'react-autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from 'react-router-dom';
function Header() {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, error, user } = useSelector((state) => state.userReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axios.get('/api/v1/admin/all-products');
      setOptions(data.product);
    }
    getOptions();
    dispatch(loadUser);
  }, [dispatch]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(value.trim()){
      navigate(`/products/${value}`);
    }else{
      navigate('/products');
    }
  }
  return (
    <>
      <div className="navbar-back">
        <div className="navbar-container">
          <div className="side-space"></div>
          <div className="main-container">
            <div className="nav-logo-container">
              <img src={LogoImage} alt="E-Commerce" />
            </div>
            <div className="nav-searchbar">
              <form onSubmit={searchSubmitHandler}>
                <Autocomplete
                  className="autocomplete-box"
                  getItemValue={(item) => item.name}
                  items={options}
                  renderItem={(item, isHighlighted) =>
                    <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                    >
                      {item.name}
                    </div>
                  }
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onSelect={(val) => setValue(val)}
                />
                <div className="search-icon-container">
                  <IconButton className="search-icon-button" type="submit" color="primary" aria-label="add to shopping cart">
                    <SearchIcon className="search-icon" />
                  </IconButton>
                </div>

              </form>
            </div>
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
              <IconButton color="primary" aria-label="add to shopping cart">
                <Link to="/cart">
                  <p className="cart-item-count">{cartItems.length}</p>
                  <ShoppingCartIcon className="shopping-cart-icon" />
                </Link>
              </IconButton>
            </div>
          </div>
          <div className="side-space"></div>
        </div>
      </div>
    </>
  );
}

export default Header;

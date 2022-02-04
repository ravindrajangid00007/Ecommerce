import React from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard.js';
import { useSelector , useDispatch } from 'react-redux';
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {addItemToCart ,removeItemFromCart ,} from "../../state/action-creators/cartAction";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import {useNavigate} from 'react-router-dom';
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const increaseQuantity = (id , quantity , stock) => {
    const newQuantity = quantity + 1;
    if(quantity < stock) {
      dispatch(addItemToCart(id , newQuantity));
    }
  }
  const decreaseQuantity = (id , quantity) => {
    const newQuantity = quantity - 1;
    if(1 >= quantity) {
      return ;
    }
    dispatch(addItemToCart(id,newQuantity));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  }
  return <>
    {cartItems.length === 0 ? (
      <div className="emptyCart">
        <RemoveShoppingCartIcon />
        <Typography>No Product in Your Cart</Typography>
        <Link to="/products">View Products</Link>
      </div>
    ) : (
      <>
        <div className="cartPage">
          <div className="cartHeader">
            <p >Products</p>
            <p >Quantity</p>
            <p >Subtotal</p>
          </div>
          {cartItems && cartItems.map((item) => (
            <div className="cartContainer" key={item.productId} >
              <CartItemCard item={item} deleteCartItems={deleteCartItems}/>
              <div className="cartInput">
                <button onClick={() => decreaseQuantity(item.productId , item.quantity)}>
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => increaseQuantity(item.productId , item.quantity , item.stock)}>
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}
          <div className="cartGrossPorfit">
            <div></div>
            <div className="cartGrossProfitBox">
              <p>Gross Total</p>
              <p>{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price, 0
              )}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkoutHandler}>Check Out</button>
            </div>
          </div>
        </div>
      </>
    )}
  </>
};

export default Cart;

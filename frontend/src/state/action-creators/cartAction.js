import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART_ITEM
} from "../constants/cartConstants";
import store from '../store';
import axios from "axios";

export const addItemToCart = (id, quantity) => {
    return async (dispatch) => {
        const { data } = await axios.get(`/api/v1/product/details/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                productId: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity: quantity
            },
        });
        localStorage.setItem("cartItems", JSON.stringify(store.getState().cartReducer.cartItems));
    }

}

export const clearCart = () => {
    return async (dispatch) => {
        localStorage.removeItem("cartItems");
        console.log("Cleared cart");
        dispatch({type: CLEAR_CART_ITEM});
    }
}
export const removeItemFromCart = (id) => {
    return async (dispatch) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id
        });
        const newCartItems = store.getState().cartReducer.cartItems.filter((i) => i.productId !== id);
        localStorage.setItem("cartItems", JSON.stringify(newCartItems));
    }
};

export const saveShippingInfo = (data) => {
    return async (dispatch) => {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    }
};
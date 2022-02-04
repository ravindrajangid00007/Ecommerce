import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_CART_ITEM
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [],shippingInfo: {}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExists = state.cartItems.find(
                (i) => i.productId === item.productId
            );
            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.productId === isItemExists.productId ? item : i)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }

            }
        case REMOVE_CART_ITEM:
            return {
                ...state ,
                cartItems: state.cartItems.filter((i) => i.productId !== action.payload),
            }
        case CLEAR_CART_ITEM:
            return {
                ...state,
                cartItems: []
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            };
        default: 
            return state;
    }
}
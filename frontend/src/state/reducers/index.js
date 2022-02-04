import { combineReducers } from "redux";
import { productReducer , productDetailsReducer , newReviewReducer , newProductReducer , deleteProductReducer ,updateProductReducer} from "./productReducers";
import {
    userReducer,
    profileReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer
} from "./userReducer";
import { cartReducer } from "./cartReducer";
import {orderReducer} from "./orderReducer";
import {myOrdersReducer , orderDetailsReducer , allOrdersReducer , deleteOrderReducer ,updateOrderReducer} from "./orderReducer";
import {categoryWiseProductsReducer} from './categoryWiseProductsReducer';
const reducers = combineReducers({
    productReducer: productReducer,
    productDetailsReducer: productDetailsReducer,
    userReducer: userReducer,
    profileReducer: profileReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cartReducer: cartReducer,
    orderReducer: orderReducer,
    myOrdersReducer: myOrdersReducer,
    orderDetailsReducer: orderDetailsReducer,
    newReviewReducer: newReviewReducer,
    newProductReducer: newProductReducer,
    deleteProductReducer: deleteProductReducer,
    updateProductReducer: updateProductReducer,
    allOrdersReducer: allOrdersReducer,
    deleteOrderReducer: deleteOrderReducer,
    updateOrderReducer: updateOrderReducer,
    allUsersReducer: allUsersReducer,
    userDetailsReducer: userDetailsReducer,
    categoryWiseProductsReducer: categoryWiseProductsReducer

});

export default reducers;
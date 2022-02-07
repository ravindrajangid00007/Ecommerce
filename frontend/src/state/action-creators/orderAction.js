import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_REQUEST,
    MY_ORDER_FAIL,
    MY_ORDER_SUCCESS,
    MY_ORDER_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,

    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,

    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,

    CLEAR_ERRORS
} from '../constants/orderConstants';

import axios from 'axios';

export const placeOrder = (order) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_ORDER_REQUEST, });
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const url = "/api/v1/order/new-order"
            const { data } = await axios.post(url, order, config);
            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
        } catch (err) {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload: err
            });
        }
    }
};

export const myOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: MY_ORDER_REQUEST });

            const url = "/api/v1/order/my-orders";

            const { data } = await axios.get(url);

            console.log("data at myOrdere" , data);
            
            dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders});
        } catch (error) {
            dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message});
        }
    }
}

export const orderDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });

            const url = `/api/v1/order/order-detials/${id}`;

            const { data } = await axios.get(url);
            
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order});
        } catch (error) {
            dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message});
        }
    }
}

export const getAllOrders = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_ORDER_REQUEST,
            });

            const { data } = await axios.get(`/api/v1/order/all-orders`);
            dispatch({
                type: ALL_ORDER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_ORDER_FAIL,
                payload: error.response.data.message
            });
        }
    }
};

export const deleteOrder = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DELETE_ORDER_REQUEST,
            });
            const url = `/api/v1/order/delete-order/${id}`;
            const { data } = await axios.delete(url);
            dispatch({
                type: DELETE_ORDER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: DELETE_ORDER_FAIL,
                payload: error.response.data.message
            });
        }
    }
};

export const updateOrder = (id , orderData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_ORDER_REQUEST,
            });
            const url = `/api/v1/order/update-order/${id}`;
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            }
            const { data } = await axios.put(url, orderData, config);
            dispatch({
                type: UPDATE_ORDER_SUCCESS,  
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_ORDER_FAIL,
                payload: error.response.data.message
            });
        }
    }
};

export const clearErrors = () => {
    return (async (dispatch) => {
        dispatch({ type: CLEAR_ERRORS });
    })
}
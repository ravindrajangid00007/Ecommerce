import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,

    CLEAR_ERRORS,
} from "../constants/productConstants.js";

import axios from 'axios';

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCT_REQUEST
            });
            let url = `/api/v1/product/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if (category) {
                url = `/api/v1/product/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(url);
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};

export const getAdminProducts = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ADMIN_PRODUCT_REQUEST,
            });

            const { data } = await axios.get(`/api/v1/admin/all-products`);
            dispatch({
                type: ADMIN_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ADMIN_PRODUCT_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};

export const getProductDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            });

            const { data } = await axios.get(`/api/v1/product/details/${id}`);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DELETE_PRODUCT_REQUEST,
            });
            const url = `/api/v1/product/delete/${id}`;
            const { data } = await axios.delete(url);
            console.log("at delete user action " , data);
            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCT_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};

export const createProduct = (productData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: NEW_PRODUCT_REQUEST,
            });
            const url = "/api/v1/product/create";
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            }
            const { data } = await axios.post(url, productData, config);
            dispatch({
                type: NEW_PRODUCT_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: NEW_PRODUCT_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};


export const updateProduct = (id , productData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PRODUCT_REQUEST,
            });
            const url = `/api/v1/product/update/${id}`;
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            }
            const { data } = await axios.put(url, productData, config);
            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,  
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCT_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};

export const newReview = (reviewData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: NEW_REVIEW_REQUEST
            });
            const url = "/api/v1/product/review";
            const config = {
                headers: { "Content-Type": "application/json" }
            }
            const { data } = await axios.put(url, reviewData, config);
            dispatch({
                type: NEW_REVIEW_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: NEW_REVIEW_FAIL,
                payload: JSON.stringify(error)
            });
        }
    }
};


export const clearErrors = () => {
    return (async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }
    )
};
import {
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,



    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,


    CLEAR_ERRORS
} from '../constants/userConstants';

import axios from 'axios';

export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOGIN_REQUEST
            })
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            let url = `/api/v1/user/login`;
            const { data } = await axios.post(url, { email: email, password: password }, config);
            console.log("data is available");
            console.log(data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log("error us available",error);
            dispatch({
                type: LOGIN_FAIL,
                payload: JSON.stringify(error.message),
            });
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            let url = `/api/v1/user/logout`;
            await axios.get(url);
            dispatch({
                type: LOGOUT_USER_SUCCESS,
            });
        } catch (error) {
            dispatch({
                type: LOGOUT_USER_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const loadUser = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: LOAD_USER_REQUEST,
            });
            let url = `/api/v1/user/profile`;
            const { data } = await axios.get(url);
            console.log("data is available loaduser");
            console.log(data);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTER_USER_REQUEST
            })
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let url = `/api/v1/user/register`;
            const { data } = await axios.post(url, userData, config);
            console.log("data is available at register user");
            console.log(data);
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}


export const updateProfile = (userData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST
            })
            const config = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            let url = `/api/v1/user/update-profile`;
            const { data } = await axios.put(url, userData, config);
            console.log("data at user update profile", data);
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const updatePassword = (passwords) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_PASSWORD_REQUEST
            })
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            let url = `/api/v1/user/update-password`;
            const { data } = await axios.put(url, passwords, config);
            dispatch({
                type: UPDATE_PASSWORD_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_PASSWORD_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const forgotPassword = (email) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: FORGOT_PASSWORD_REQUEST
            })
            const config = {
                headers: { "Content-Type": "application/json" }
            };
            let url = `/api/v1/user/forgot-password`;
            const { data } = await axios.post(url, email, config);
            console.log("data is available");
            console.log(data);
            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FORGOT_PASSWORD_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(
            `/api/v1/user/reset-password/${token}`,
            passwords,
            config
        );

        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message
        });
    }
};


export const allUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_USER_REQUEST,
            });
            let url = `/api/v1/admin/getAllUser`;
            const { data } = await axios.get(url);
            dispatch({
                type: ALL_USER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_USER_FAIL,
                payload: error.response.data.message
            });
        }
    }
}



export const userDetails = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: USER_DETAILS_REQUEST,
            });
            let url = `/api/v1/admin/getUserDetails/${id}`;
            const { data } = await axios.get(url);
            console.log("data at update user" ,data);
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const updateUser = (id , userData) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_USER_REQUEST,
            });
            const config = {
                headers: { "Content-Type": "application/json"}
            }
            let url = `/api/v1/admin/updateUser/${id}`;
            const { data } = await axios.put(url , userData , config);
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: error.response.data.message
            });
        }
    }
}

export const deleteUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: DELETE_USER_REQUEST,
            });

            let url = `/api/v1/admin/deleteUser/${id}`;
            const { data } = await axios.delete(url);
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: DELETE_USER_FAIL,
                payload: error.response.data.message
            });
        }
    }
}



export const clearErrors = () => {
    return (async (dispatch) => {
        dispatch({
            type: CLEAR_ERRORS
        });
    }
    )
};
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_RESET,

    NEW_REVIEW_FAIL,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_RESET,
    
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,

    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_RESET,
    
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RESET,

    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_RESET,

    CLEAR_ERRORS,
} from "../constants/productConstants.js";

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST: 
            return {
                loading: true,
                products: [],
            };
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            };
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload.review,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
export const newProductReducer = (state = { }, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                success: false,
            }
        default:
            return state;
    }
}
export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload.success
            };
        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false, 
                error: action.payload,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success
            };
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product:{}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload.product,
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case PRODUCT_DETAILS_RESET:
            return {

            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}

export const newReviewReducer = (state = { review: {} }, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                review: action.payload,
                success: true
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                success: false,
            }
        default:
            return state;
    }
}
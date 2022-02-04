import axios from "axios";
const ADD_PRODUCTS_TO_CATAGORYWISE = 'ADD_PRODUCTS_TO_CATAGORYWISE';

export const categoryWiseProducts = (categories) => {
    return async (dispatch) => {

        let keyword = "";
        let currentPage = 1;
        let price = [0, 25000];
        let ratings = 0
        categories.forEach(async category => {
            let url = `/api/v1/product/list?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            const { data } = await axios.get(url);
            dispatch({
                type: ADD_PRODUCTS_TO_CATAGORYWISE,
                payload: {
                    category: category,
                    products: data.product
                },
            });
        })

    }

}
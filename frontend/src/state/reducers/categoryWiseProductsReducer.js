const ADD_PRODUCTS_TO_CATAGORYWISE = 'ADD_PRODUCTS_TO_CATAGORYWISE';

export const categoryWiseProductsReducer = (state = { categoryProducts: []}, action) => {
    switch (action.type) {
        case ADD_PRODUCTS_TO_CATAGORYWISE:
            const products = action.payload.products;
            const category = action.payload.category;
            const isItemExists = state.categoryProducts.find(
                (object) => object.category === category
            );
            console.log("inside reducers");
            if (isItemExists) {
                return {
                    ...state,
                    categoryProducts: state.categoryProducts.map((object) =>
                        object.category === isItemExists.category ? {category: category , products: products} : object)
                }
            } else {
                return {
                    ...state,
                    categoryProducts: [...state.categoryProducts, {category: category , products: products}],
                }

            }
        default: 
            return state;
    }
}
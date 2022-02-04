import React, { useEffect, useState } from 'react';
import { getProduct } from '../../state/action-creators/productAction';
import Carousel from 'react-material-ui-carousel'
import ProductCard from './ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import ElasticCarousel from 'react-elastic-carousel';


import './CategoryProducts.css';
const CategoryProducts = (props) => {
    const breakpoints = [
        {width: 1 , itemsToShow: 2},
        {width: 550 , itemsToShow:4},
        {width:800 , itemsToShow: 6},
        {width: 1200 , itemsToShow: 7},
      ]
    const { categoryProducts } = useSelector((state) => state.categoryWiseProductsReducer);
    return (
        <>
            {
                categoryProducts.map((object, i) => (
                    (
                        object.products.length > 0 &&
                        <div key={i} className="category-wise-product-container" title={`section-${object.category}`} id={object.category}>
                            <h2>{object.category}</h2>
                            <ElasticCarousel breakPoints={breakpoints}>
                                {
                                    object.products.map((product, i) => (
                                        <ProductCard key={i} product={product} />
                                    ))
                                }
                            </ElasticCarousel>
                        </div>
                    )
                ))
            }
        </>
    )
};

export default CategoryProducts;

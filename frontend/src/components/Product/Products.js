import React, { useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
} from "../../state/action-creators/productAction";
import ProductCard from "../Home/ProductCard";
import Loader from "../layouts/Loader/Loader";
import { useParams } from 'react-router-dom';
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

function Products(props) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const location = useLocation();
  const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
    (state) => state.productReducer
  );
  const params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // let cate = location.search ? location.search.split("=")[1] : "";

    // if (cate != "") {
    //   setCategory(cate);
    // }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, alert, category, error, ratings, location]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event, newValue) => {
    setPrice(newValue);
  };

  const ratingHandler = (event, newValue) => {
    setRatings(newValue);
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productsPage">

            <div className="filterbox">
              <Typography>Price</Typography>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="on"
                min={0}
                max={10000}
              // getAriaValueText={valuetext}
              />
              <Typography>Categories</Typography>
              <ul className="categoryBox">
                <li
                  className="categoryLink"
                  onClick={() => { setCategory("") }}
                >All</li>
                {categories.map((category) => (
                  <li
                    className="categoryLink"
                    key={category}
                    onClick={() => { setCategory(category) }}
                  >{category}</li>
                ))}
              </ul>
              <Typography>Ratings</Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={ratings}
                key={`slider-${ratings}`}
                onChange={ratingHandler}
                marks
                valueLabelDisplay="auto"
                step={1}
                min={0}
                max={5}
              />
            </div>
            <div className="productsBlock">
              <h2 className="productsHeading">Products</h2>
              <div className="productsList">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
              {resultPerPage <= filteredProductsCount && (<div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="FirstPage"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>)}
            </div>

          </div>

        </>
      )}
    </>
  );
}

export default Products;

import React, { useEffect } from "react";
import { BsFillMouseFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layouts/MetaData.js";
import { getProduct } from "../../state/action-creators/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layouts/Loader/Loader";
import { useAlert } from "react-alert";
import { useNavigate } from 'react-router-dom';
import Products from "../Product/Products";
import CategoryProducts from "./CategoryProducts";
import { categoryWiseProducts } from '../../state/action-creators/categoryWiseProductsAction';
import Carousel from "react-material-ui-carousel";

import next from './next';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';
import { borderRadius } from "@mui/system";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

function Home() {

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.productReducer
  );
  const { categoryProducts } = useSelector((state) => state.categoryWiseProductsReducer);

  const categories = [
    "Footwear",
    "Laptop",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
    useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(categoryWiseProducts(categories));
  }, [error, alert]);

  const categoryImages = [
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    },
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    }
    ,
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    },
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    }
    ,
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    }
    ,
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    }
    ,
    {
      src: "https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg",
    }

  ]

  const carouselImages = [
    {
      src: "https://rukminim1.flixcart.com/flap/5000/5000/image/6490033657a09cd4.jpg?q=50",
    },
    {
      src: "https://rukminim1.flixcart.com/flap/5000/5000/image/70527c4bd8cbbf55.jpg?q=50",
    },
    {
      src: "https://rukminim1.flixcart.com/flap/5000/5000/image/da81fc398d961c06.jpg?q=50",
    },
  ]


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERCE" />
          <div className="category-link-container">
            <div className="category-list">
              <ul>
                <li>
                  <Link to="/products">
                    <img src="https://5.imimg.com/data5/XA/VB/NX/SELLER-48574413/mens-pajama-pants-500x500.jpg" alt="ALL" />
                    <p>All</p>
                  </Link>
                </li>
                {categories.map((category, index) => (
                  <li key={index}>
                    <ScrollLink activeClass="active" to={category} spy={true} smooth={true} offset={-50} duration={50}>
                      <img src={categoryImages[index].src} alt={category} />
                      <p>{category}</p>
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Carousel
            className="carousel-container"
            navButtonsAlwaysVisible={true}
            fullHeightHover={false}
            navButtonsProps={{
              style: {
                backgroundColor: 'white',
                color: 'black',
                padding: '30px 0px',
                margin: 0

              }
            }}
            NavButton={({ onClick, className, style, next, prev }) => {
              return (
                <Button onClick={onClick} className={className} style={style}>
                  {next && <ArrowForwardIosIcon />}
                  {prev && <ArrowBackIosNewIcon />}
                </Button>
              )
            }}
            indicatorIconButtonProps={{
              style: {
                display: 'none',
              }
            }}
          >
            {
              carouselImages.map((object, i) => (
                <div key={i} className="carousel-image-container">
                  <img src={object.src} alt="image" />
                </div>
              ))
            }
          </Carousel>
          {/* <CategoryProducts /> */}
          {categoryProducts.length === categories.length && <CategoryProducts />}
        </>
      )}
    </>
  );
}

export default Home;

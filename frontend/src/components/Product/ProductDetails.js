import React, { useEffect, useState } from "react";
import ElasticCarousel from 'react-elastic-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails, clearErrors, newReview } from "../../state/action-creators/productAction.js";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import Loader from '../layouts/Loader/Loader';
import { useAlert } from "react-alert";
import { addItemToCart } from "../../state/action-creators/cartAction";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { NEW_REVIEW_RESET } from '../../state/constants/productConstants';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from "@material-ui/core";

function ProductDetails() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { product, loading, error } = useSelector(
    (state) => state.productDetailsReducer
  );
  const { review, error: reviewError, success } = useSelector((state) => state.newReviewReducer);
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const addItemToCartHandler = () => {
    dispatch(addItemToCart(productId, quantity));
    alert.success("Item added to cart");
  }

  const submitReviewToggle = () => {
    setOpen(!open);
  }

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", productId);

    dispatch(newReview(myForm));
    dispatch(getProductDetails(productId));
    setOpen(!open);
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review submitted successfully");
      dispatch({type: NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, error, alert, reviewError, success]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,1)",
    activeColor: "tomato",
    value: 5,
    isHalf: true,
    size: window.innerWidth < 600 ? 25 : 30,
  };

  const breakpoints = [
    { width: 1, itemsToShow: 1 }
  ]
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDetails">
            <div className="carrousel-product-container">
              <div className="carouselBox">
                <ElasticCarousel breakPoints={breakpoints} className="carousel-container"
                showArrows={true}
                >
                  {product.images &&
                    product.images.map((item, i) => (
                      <div key={item.url} className="carouselImage">
                        <img
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      </div>
                    ))}
                </ElasticCarousel>
              </div>
              <div className="productDetailBox">
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({product.numOfReviews} Review)</span>
                </div>
                <div className="detailsBlock-3">
                  <h1>{`$${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      <input type="number" readOnly={true} value={quantity} />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    {product.stock >= 1 && <button disabled={product.stock < 1 ? true : false} onClick={addItemToCartHandler}>Add to Cart</button>}
                  </div>
                  <p>
                    <b>Status:</b>
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className="detailsBlock-4">
                  Description: <p>{product.description}</p>
                </div>
                {product.stock >= 1 && <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>}
              </div>
            </div>

            <div className="reviewBox">
              <h3 className="reviewHeading">Reviews</h3>

              <Dialog
                aria-labelledby="simple-dialog-title"
                open={open}
                onClose={submitReviewToggle}
              >
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(event.target.value);
                    }}
                  />
                  <textarea
                    className="submitDialogTextArea"
                    cols="30"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  >
                  </textarea>
                </DialogContent>
                <DialogActions>
                  <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                  <Button onClick={reviewSubmitHandler} color="primary">Submit</Button>
                </DialogActions>
              </Dialog>

              <div className="reviews">
                {product.reviews && product.reviews[0] ? (
                  product.reviews.map((review) => <ReviewCard review={review} />)
                ) : (
                  <p className="noReviews">No Review Yet</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductDetails;

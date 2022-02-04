import React from 'react'
import ReactStars from "react-rating-stars-component";
import profilePng from '../../images/blank-profile-picture-973460_1280.png'
 function ReviewCard({review}) {
    const options = {
        edit: false,
        color: "rgba(20,20,20,1)",
        activeColor: "tomato",
        value: review.rating,
        isHalf: true,
        size: window.innerWidth < 600 ? 20 : 25,
      };

     return (
         <div className="reviewCard">
            <img src={profilePng} alt="User" />
            <p>{review.user.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
         </div>
     )
 }
 
 export default ReviewCard
 
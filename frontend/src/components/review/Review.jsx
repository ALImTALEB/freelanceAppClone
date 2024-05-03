import React from "react";

import "./Review.scss";
import newRequest from "../../utils/newRequest";
import { useQuery } from "@tanstack/react-query";

const Review = ({ review }) => {
  const { isPending, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="review">
      {
        isPending ? "Loading.."
        : error 
        ? "something went wrong"
        :
        (<div className="user">
        <img
          className="pp"
          src={ data.img || "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"}
          alt=""
        />
        <div className="info">
          <span> {data.username} </span>
          <div className="country">
            <span> {data.country} </span>
          </div>
        </div>
      </div>)
      }
      <div className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="/img/star.png" alt="" key={i} />
          ))}
        <span> {review.star} </span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="/img/like.png" />
        <img src="/img/dislike.png" />
        <span>Yes</span>
        <span>No</span>
      </div>
    </div>
  );
};

export default Review;

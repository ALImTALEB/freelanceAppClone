import { Slider } from "infinite-react-carousel";
import React from "react";
import "./Gig.scss"

import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';
import { Link, useParams } from "react-router-dom";
import Reviews from "../../components/reviews/Reviews.jsx";


const Gig = () => {

  const {id} = useParams()

  const { isPending, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(
        `/gigs/single/${id}`)
        .then( (res) => {
        return res.data
      } )
  })

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [userId],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });
  console.log(dataUser)


  return (
    <div className="gig">
     { isPending ? "Loading.."
     :
     error ? "something went wrong"
     :
      <div className="container">
        <div className="left">
          <span className="breadCrumbs">
            FIVERR {">"} GRAPHIC & DESIGN {">"}
          </span>
          <h1>{data.title}</h1>

         { isLoadingUser ? "Loading.."
         : errorUser ? "something wrong"
         :
          (<div className="user">
            <img
              src={dataUser.img || "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"}
              alt=""
              className="pp"
            />
            <span> {dataUser.username} </span>
            { !isNaN(data.totalStars / data.starNumber) && (
            <div className="stars">
            {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            )) }

              <span>
                     {Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
                     )}
          </div>)
         }

          <Slider className="slider" slidesToShow={1} arrowsScroll={1}>
            {data.images.map((img) => (
            <img
            key={img}
              src={img}
              alt=""
            />
            ))}
          </Slider>
          <h2>About This Gig</h2>
          <p>
            {data.desc}
          </p>
          
            { isLoadingUser ? "Loading.."
         : errorUser ? "something went wrong"
         : ( <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={dataUser.img || "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"}
                alt=""
              />
              <div className="info">
                <span> {dataUser.username} </span>
                { !isNaN(data.totalStars / data.starNumber) && (
            <div className="stars">
            {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item, i) => (
              <img src="/img/star.png" alt="" key={i} />
            )) }

              <span>
                     {Math.round(data.totalStars / data.starNumber)}
              </span>
            </div>
                     )}
                <button>Contact Me</button>
              </div>
              
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From</span>
                  <span className="desc"> {dataUser.country} </span>
                </div>
                <div className="item">
                  <span className="title">Member since</span>
                  <span className="desc"> {new Date(dataUser.createdAt).getFullYear()} </span>
                </div>
                <div className="item">
                  <span className="title">Avg. response time</span>
                  <span className="desc">4 hours</span>
                </div>
                <div className="item">
                  <span className="title">Last delivery</span>
                  <span className="desc">1 day</span>
                </div>
                <div className="item">
                  <span className="title">Language</span>
                  <span className="desc">English</span>
                </div>
              </div>
              <hr />
              <p>
                {dataUser.desc}
              </p>
            </div>
          </div>
         ) }
          <Reviews gigId={id} />
        </div>
        <div className="right">
          <div className="price">
            <h3> {data.shortTitle} </h3>
            <h2>$ {data.price}</h2>
          </div>
          <p>
            {data.shortDesc}
          </p>
          <div className="details">
          <div className="item">
            <img src="/img/clock.png" alt="" />
            <span> {data.deliveryDate} days Delivery </span>
          </div>
          <div className="item">
            <img src="/img/recycle.png" alt="" />
            <span> {data.revisionNumber} Revisions </span>
          </div>
          </div>
          <div className="features">
            {
              data.features.map( feature => (
              <div className="item" key={feature}>
              <img src="/img/greencheck.png" alt="" />
              <span> {feature} </span>
            </div>
               ) )
            }
          </div>
          <Link className="link" to={`/pay/${id}`}>
          <button>Continue</button>
          </Link>
        </div>
      </div>}
    </div>
  );
};

export default Gig;

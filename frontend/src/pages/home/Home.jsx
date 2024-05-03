import React from 'react'
import "./Home.scss"
import Featured from '../../components/featured/Featured'
import TrustedBy from '../../components/trustedBy/TrustedBy'
import Slide from '../../components/slide/Slide'
import {cards, projects} from "../../data.js";
import CatCard from '../../components/catCard/CatCard.jsx';
import ProjectCard from '../../components/projectCard/ProjectCard.jsx'

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5} >
      {cards.map(card => (
            <CatCard item={card} key={card.id} />
          ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
          <h1>A whole world of freelance talent at your fingertips</h1>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Stick to your budget
          </div>
          <p>
            Find high-quatlity services at every price point. No hourly rates,
            just project-based pricing.
          </p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Get quality work done quickly
          </div>
          <p>
          Hand your project over to a talented freelancer in minutes, get long-lasting results.
          </p>

          <div className="title">
            <img src="./img/check.png" alt="" />
            Pay when you re happy
          </div>
          <p>
          Upfront quotes mean no surprises. Payments only get released when you approve.
          </p>

          <div className="title">
            <img src="./img/check.png" alt="" />
            Count on 24/7 support
          </div>
          <p>
          Our round-the-clock support team is available to help anytime, anywhere.
          </p>

          </div>
          <div className="item">
            <video src="./img/video.mp4" controls />
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
          <h1>fiverr business</h1>
          <h1>A business solution designed for teams</h1>
          <p>Upgrade to a curated experience packed with tools and benefits, dedicated to business</p>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Connect to freelancers with proven business experience
          </div>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Build your own branded marketplace of certified experts          </div>
          <div className="title">
            <img src="./img/check.png" alt="" />
            Manage your freelance workforce and onboard additional talent with an end-to-end SaaS solution
          </div>
          <button>Explore Fiverr Business</button>
          </div>
          <div className="item">
            <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/51c35c7cecf75e6a5a0110d27909a2f5-1690202609364/EN.png"/>
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowsScroll={5} >
      {projects.map(card => (
            <ProjectCard item={card} key={card.id} />
          ))}
      </Slide>

    </div>
  )
}

export default Home
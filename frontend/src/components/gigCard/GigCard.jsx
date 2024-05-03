import React from 'react'
import "./GigCard.scss"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const GigCard = ({item}) => {

  const { isPending, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(
        `/users/${item.userId}`)
        .then( (res) => {
        return res.data
      } )
  })


  return (
    <Link className='link' to={`/gig/single/${item._id}`}>

    <div className="gigCard">
        <img src={item.cover} alt='' />
        <div className="info">
                {
                  isPending ? 
                  "Loading"
                  :
                  error ? "something went wrong"
                  : 
                  (<div className="user">
                    <img src={data.img || "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"} alt='' />
                    <span> {data.username} </span>
                </div>)
                }
                <span> {item.desc} </span>
                <div className="star">
                    <img src='./img/star.png' alt='' />
                    <span> { !isNaN(item.totalStars / item.starNumber) &&
                     Math.round(item.totalStars / item.starNumber)} </span>
                </div>
        </div>
        <hr />
        <div className="details">
            <img src='./img/heart.png' alt='' />
            <div className="price">
            <span>STARTING AT</span>
            <h2>${item.price}</h2>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default GigCard
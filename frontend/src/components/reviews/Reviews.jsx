import React, { useState } from 'react'

import "./Reviews.scss"
import Review from '../review/Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const Reviews = ({gigId}) => {
    const [erro, setErro] = useState("")

    const queryClient = useQueryClient()

    const { isPending, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
          newRequest.get(
            `/reviews/${gigId}`)
            .then( (res) => {
            return res.data
          } )
      })

      const mutation = useMutation({
        mutationFn: (review) => {
          return newRequest.post('/reviews', review)
        },
        onSuccess: () => {
           queryClient.invalidateQueries(["reviews"])
        },
        onError: (err) => {
            setErro(err.response.data)
        }
      })      

      const handleSubmit = (e) => {
        e.preventDefault()
        let desc = e.target[0].value
        let star = e.target[1].value
        mutation.mutate({gigId ,desc, star})
        desc = ""
        star = 1
      }

  return (
    <div className="reviews">
            <h2>Reviews</h2>
            {
                isPending ? "Loading.."
                : error ? "something went wrong"
                : data.map( (review) => <Review review={review}  key={review._id} /> )
            }
            <div className="add">
            <h3>Add new review</h3>
            <form className='addForm' onSubmit={handleSubmit}>
                <input type='text' placeholder='write ur opinion' />
                <select name='' id=''>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button>Send</button>
            </form>
            </div>
          {
            erro && <span> {erro} </span>
          }
          </div>
  )
}

export default Reviews
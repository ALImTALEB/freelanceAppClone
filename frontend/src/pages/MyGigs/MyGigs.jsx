import React from 'react'
import { Link } from 'react-router-dom'

import "./MyGigs.scss"

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest.js';
import Loader from '../../components/loader/Loader.jsx';

const MyGigs = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient();

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest.get(
        `/gigs?userId=${currentUser._id}`)
        .then( (res) => {
        return res.data
      } )
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id)
  }
  
  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>Gigs</h1>
          <Link to="/add">
            <button>
            Add New Gig
            </button>
          </Link>
        </div>
       {
          isPending ? <Loader />
          : error ? "something went wrong"
          : 
          (
         <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {
            data.map(gig => (

            <tr key={gig._id} >
            <td>
              <img className="img" 
              src={ gig?.cover || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvmkhu5cfE88xF85XAfu8T7TvR5JGOloYcbfT5XwCIdg&s'} alt='' />
            </td>
            <td> {gig.title} </td>
            <td> {gig.price} </td>
            <td> {gig.sales} </td>
            <td>
              <img onClick={ () => handleDelete(gig._id)} className="delete" src='/img/delete.png' alt='' />
            </td>
          </tr>
            ))
          }
        
        </table>
        )}
      </div>
    </div>
  )
}

export default MyGigs
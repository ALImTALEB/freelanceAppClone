import React, { useReducer, useState } from 'react'
import "./Add.scss"
import { INITIAL_STATE, gigReducer } from '../../reducers/gigReducer'
import upload from "../../utils/upload.js"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState([])


  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)

  const handleChange = e => {
    dispatch({ 
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value }
     })
  }

  const handleFeature = e => {
    e.preventDefault()
    dispatch({ 
      type: "ADD_FEATURES",
      payload: e.target[0].value
     })
     e.target[0].value = ""
  }

  const handleUpload = async () => {
    setUploading(true)
    try {
      const cover = await upload(singleFile)

      const images = await Promise.all(
        [...files].map( async file => {
          const url = await upload(file)
          return url
        })
      )
        setUploading(false)
        dispatch({ type: "ADD_IMAGES", payload: {cover, images} })
    } catch (error) {
      console.log(error)
    }
  }

  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post(`/gigs`, gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });



  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
    navigate("/mygigs")
  }

  return (
    <div className='add'>
      <div className="container">
        <h1>Add New Gig</h1>
        <div className="sections">
          <div className="left">
            <label htmlFor="">Title</label>
            <input name='title' onChange={handleChange} type='text' placeholder='e.g. I will do something Im really good at' />
            <label htmlFor="">Category</label>
            <select name='cat' id='cat' onChange={handleChange} >
              <option value='design' >Design</option>
              <option value='web' >Web Dev</option>
              <option value='animation' >Animation</option>
              <option value='music' >Music</option>
            </select>
            <div className="images">
              <div className="imagesInputs">

            <label  htmlFor="">Cover Image</label>
            <input type='file' onChange={e => setSingleFile(e.target.files[0])} />
            <label htmlFor="">Upload Images</label>
            <input  type='file' multiple onChange={e => setFiles(e.target.files)} />
              </div>
            
            </div>
            <button onClick={handleUpload}> {uploading ? "uploading" : "upload"} </button>
            <label htmlFor="">Description</label>
            <textarea name='desc'
            onChange={handleChange}
             id='' 
             cols={30}
              rows={16}
              placeholder='Brief description to introduce you service to customers'
               />
               <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="right">
            <label htmlFor=''>Short Title</label>
            <input type='text'
            name='shortTitle'
            onChange={handleChange}
             placeholder='e.g. One-page web design' />
            <label htmlFor=''>Short Description</label>
            <textarea name='shortDesc'
            onChange={handleChange}
             id='' 
             cols={30}
              rows={16}
              placeholder='short description of your service'
               />
            <label htmlFor=''>Delivery Time(e.g. 3 days)</label>
            <input type='number' name='deliveryTime' onChange={handleChange} min={1} />
            <label htmlFor=''>Revision Number</label>
            <input type='number' name='revisionNumber' onChange={handleChange} min={1} />

            <label htmlFor=''>Add Features</label>
            <form className='add' onSubmit={handleFeature}>
            <input type='text' placeholder='e.g page design' />
            <button type='submit'>Add</button>
            </form>
            <div className="addedFeatures">
             { 
              state?.features?.map(f => (

              <div key={f} className="item">
                <button onClick={() => dispatch({ type: "REMOVE_FEATURES", payload: f }) }>
                  {f}
                  <span>X</span>
                </button>
              </div>
              ))
              }
            </div>
            
            <label htmlFor=''>Price</label>
            <input type='number' name='price' onChange={handleChange} min={1} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Add
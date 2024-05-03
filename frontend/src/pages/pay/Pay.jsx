import React, { useEffect, useState } from 'react'
import "./Pay.scss"

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import newRequest from '../../utils/newRequest.js';
import { useParams } from 'react-router-dom'
import CheckoutForm from '../../components/checkoutForm/CheckoutForm.jsx';


const stripePromise = loadStripe('pk_test_51Oqih3I8OG1UWpWIH0iuKptlbYLKfBlYP1PwAvCsa6jXUpierXlHEtVHN0jziXKM1IocjZI2gmCOQrtMa8JsONKM00M62uFoKz');

const Pay = () => {
    const [clientSecret, setClientSecret] = useState()

    const {id} = useParams()

    useEffect( () => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post(`orders/create-payment-intent/${id}`)
                setClientSecret(res.data.clientSecret)
            } catch (err) {
                console.log(err)
            }
        }
        makeRequest()
    }, [] )

    const appearance = {
        theme: 'stripe'
    }
    const options = {
        clientSecret,
        appearance
    }

  return (
    <div className='pay'>
    {
       clientSecret && (
        <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
       ) 
    }
    </div>
    
  )
}

export default Pay
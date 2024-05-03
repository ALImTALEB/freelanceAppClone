import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest.js'

const Success = () => {

    const {search} = useLocation()
    const navigate = useNavigate()
    const params = new URLSearchParams(search)
    const payment_intent = params.get("payment_intent")

    useEffect( () => {
        const makeRequest = async () => {
            try {
                await newRequest.put("/orders", {payment_intent})
                navigate("/orders")
            } catch (err) {
                console.log(err)
            }
        }

        makeRequest()
    }, [] )

  return (
    <div>Payment successful.
    you are being redirected to the order page.
    please do not close the page
    </div>
  )
}

export default Success
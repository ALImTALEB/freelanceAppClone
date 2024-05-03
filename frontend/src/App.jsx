import React from "react"
import Navbar from "./components/navbar/Navbar"
import "./App.scss"

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import Gigs from "./pages/gigs/Gigs"
import Gig from "./pages/gig/Gig"
import Orders from "./pages/orders/Orders"
import MyGigs from "./pages/MyGigs/MyGigs"
import Add from "./pages/add/Add"
import Messages from "./pages/messages/Messages"
import Message from "./pages/message/Message"
import Login from "./pages/login/Login"
import Register from "./pages/register/Register"
import Pay from "./pages/pay/Pay"
import Success from "./pages/sucess/Success"

function App() {

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
      <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/gigs",
          element: <Gigs />
        },
        {
          path: "/gig/single/:id",
          element: <Gig />
        },
        {
          path: "/orders",
          element: <Orders />
        },
        {
          path: "/mygigs",
          element: <MyGigs />
        },
        {
          path: "/add",
          element: <Add />
        },
        {
          path: "/messages",
          element: <Messages />
        },
        {
          path: "/message/:id",
          element: <Message />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/pay/:id",
          element: <Pay />
        },
        {
          path: "/success",
          element: <Success />
        },
      ]
    },
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App

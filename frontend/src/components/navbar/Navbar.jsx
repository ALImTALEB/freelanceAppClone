import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">Freelancerrr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Freelancerrr Business</span>
          <span>Explore</span>
          <span>English</span>
          <span>
            {" "}
            <Link className="link" to="/login">
              Sign in
            </Link>
          </span>
          {!currentUser?.isSeller && <span>Become a Seller</span>}
          {!currentUser && (
            <button>
              <Link className="link" to="/register">
                Join
              </Link>
            </button>
          )}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src={
                  currentUser.img ||
                  "https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"
                }
                alt=""
              />
              <span> {currentUser?.username} </span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/mygigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link onClick={handleLogOut} className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link to="/" className="link menuLink">
              Graphic & Design
            </Link>
            <Link to="/" className="link">
              Video & Animation
            </Link>
            <Link to="/" className="link">
              Writing & Translation
            </Link>
            <Link to="/" className="link">
              AI Services
            </Link>
            <Link to="/" className="link">
              Digital Marketing
            </Link>
            <Link to="/" className="link">
              Music & Audio
            </Link>
            <Link to="/" className="link">
              Programming & Tech
            </Link>
            <Link to="/" className="link">
              Business
            </Link>
            <Link to="/" className="link">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;

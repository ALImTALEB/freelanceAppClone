import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";

import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import { useLocation } from "react-router-dom";

const Gigs = () => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("sales");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search ? search : "?"}&min=${minRef.current.value}&max=${
            maxRef.current.value
          }&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };
  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">
        Freelancerrr `{">"} GRAPHIC & DESIGN `{">"}
        </span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Freelancerrr AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budged</span>
            <input ref={minRef} type="text" placeholder="min" />
            <input ref={maxRef} type="text" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">SortBy</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isPending
            ? ""
            : error
            ? "Something went wrong"
            : data.map((gig) =>
                gig ? <GigCard item={gig} key={gig._id} /> : "Not Found"
              )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;

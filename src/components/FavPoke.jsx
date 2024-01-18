/* eslint-disable react/prop-types */
import React from "react";
import LikePoke from "./LikePoke";

function FavPoke({ fav }) {
  return (
    <div className="grid sm:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
      {fav?.map((data, index) => (
        <div key={index}>
          <h3>{data.name}</h3>
          <img src={data?.sprites?.other?.home?.front_default} alt={data.name} />
          <br />
          <LikePoke />
        </div>
      ))}
    </div>
  );
}

export default FavPoke;

import React from "react";
import { Link } from "react-router-dom";

import "../App.css";

function Landing() {
  return (
    <div>
      <h1 className="HomepageHeader">Welcome to Rice to Meet You</h1>

      <img
        id="LandingRice"
        src="/imgs/landing.jpg"
        alt="Image of Rice in Spoons"
      />

      <div className="InfoText">
        At Rice to Meet You, we specialize in bowls. We use the freshest
        ingredients and our food is all organic. Click order now to get started
        on ordering your food.
        <br />
        <Link to="/order">
          <button className="nowbtn">Order Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;

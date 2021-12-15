import React from 'react';
import {Link} from 'react-router-dom'

import '../App.css';

function Landing() {
  return (
    <div>
    
    <h1>Welcome to Rice to Meet You</h1>

    <img id="LandingRice" src="/imgs/landing.jpg" alt='landing_pic'/>

    <div id="InfoText">
      At Rice to Meet You, we specialize in bowls. 
        We use the freshest ingredients and our food is all organic.
        Click order now to get started 
        on ordering your food.
      <br/> 
      <Link to='/order'>
      <button>Order Now</button>
      </Link>
    </div>

    </div>

  );
}

export default Landing;

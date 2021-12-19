import React, { useState, useEffect } from "react";
import { useDispatch} from 'react-redux';
import actions from '../actions'
import axios from "axios";
import '../App.css';

import Cart from './Cart';

function Order() {
  const [premadeData, setPremadeData] = useState(undefined);
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGF, setFilterGF] = useState(false);
  const [numProtein, setNumProtein] = useState(1);
  const [numTopping, setNumTopping] = useState(1);
  const formatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'});

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`http://localhost:3001/premade`);
        //console.log(data);
        setPremadeData(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  const orderBowl = (order) => {
    // This function will connect the forms to the redux cache.
    // Big, catch-all error-checking block
    if ((!order.name || typeof(order.name) !== 'string') || 
        (!order.base || typeof(order.base) !== 'string') ||
        (!order.price || typeof(order.price) !== 'number') ||
        (!order.protein || !Array.isArray(order.protein) || order.protein.length === 0) ||
        (!order.topping || !Array.isArray(order.topping) || order.topping.length === 0) ||
        (!order.sauce || !Array.isArray(order.sauce) || order.sauce.length === 0)
      ){
      console.log("Error: Mis-formatted order not placed:");
      console.log(order);
    }else{
      // Successful code executes in here
      //console.log("bowl order:");
      //console.log(order);

      dispatch(actions.addToCart(
        order.name,
        order.base,
        order.protein,
        order.topping,
        order.sauce,
        order.price
      ));
    }
  }


  const addPremadeBowl = (name) =>{
    //console.log(`adding pre-made ${name} to order`);
    switch (name){
      case 'Gold Standard Chicken':
        orderBowl({
          name: 'Gold Standard Chicken',
          base: 'white rice',
          protein: ['chicken'],
          topping: ['sweet onion', 'green pepper', 'pineapple'],
          sauce: ['teriyaki sauce'],
          price: 11.00
        });
        break;
      case 'Fish Lover':
        orderBowl({
          name: 'Fish Lover',
          base: 'white rice',
          protein: ['salmon', 'tuna'],
          topping: ['corn', 'cucumber', 'kani salad', 'seaweed salad'],
          sauce: ['poke sauce'],
          price: 14.70
        });
        break;
      case 'I Love Chipotle':
        orderBowl({
          name: 'I Love Chipotle',
          base: 'brown rice',
          protein: ['steak'],
          topping: ['romaine lettuce', 'cheese', 'guacamole'],
          sauce: ['sour cream'],
          price: 13.40
        });
        break;
      case 'No Meat For Me':
        orderBowl({
          name: 'No Meat For Me',
          base: 'brown rice',
          protein: ['beyond meat', 'fried tofu'],
          topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
          sauce: ['teriyaki sauce'],
          price: 14.40
        });
        break;
      default:
        console.log(`Error: No order found for ${name}.`);
    }
  }

  const addCustomBowl = (e) =>{
    e.preventDefault();
    //console.log(`adding custom bowl to order`);
    let proteins = [];
    let toppings = [];

    proteins.push(e.target.protein_1.value);
    if (numProtein >= 2) proteins.push(e.target.protein_2.value);
    if (numProtein >= 3) proteins.push(e.target.protein_3.value);

    toppings.push(e.target.topping_1.value);
    if (numTopping >= 2) toppings.push(e.target.topping_2.value);
    if (numTopping >= 3) toppings.push(e.target.topping_3.value);

    orderBowl({
      name: 'Custom Bowl',
      base: e.target.base.value,
      protein: proteins,
      topping: toppings,
      sauce: [e.target.sauce.value],
      price: 12 + 3 * (numProtein - 1)
    });
  }


  const getImageURL = (name) =>{
    switch (name){
      case 'Gold Standard Chicken':
        return '/imgs/bowl_chicken.jpg';
      case 'Fish Lover':
        return '/imgs/bowl_fish.jpg';
      case 'I Love Chipotle':
        return '/imgs/bowl_chipotle.jpg';
      case 'No Meat For Me':
        return '/imgs/bowl_vegan.jpg';
      default:
        return 'imgs/bowl_custom.png';
    }
  }

  return (
    <div>

      <Cart />

      <h2>Order a Bowl:</h2>
      <form >
        <label>
          <input type="checkbox" name="vegan" value={filterVegan} 
          onChange={(e)=>{setFilterVegan(e.target.checked);}} />
          Vegan 
        </label>
        <br/>
        <label>
          <input type="checkbox" name="gluten-free" value={filterGF} 
          onChange={(e)=>{setFilterGF(e.target.checked);}} />
          Gluten-Free
        </label>
      </form>

      <h3>Pre-made:</h3>
      <ul className="bowl-list">
        {premadeData?.map( (bowl, idx) =>{
          //This is where we build the card for each pre-made dish
          // Condition for rendering under filtering.
          let renderOkay = true;
          if ( (filterGF && !bowl.gluten_free) || (filterVegan && !bowl.vegan) ){
            renderOkay = false;
          }
          //Unique key for list entry
          let element_id = "bowl"+idx;
          //Vegan + Gluten-free Tag
          let status = [];
          if (bowl.vegan){ status.push("Vegan")};
          if (bowl.gluten_free){status.push("Gluten Free")};
          let bowl_status = status.join(", ");
          // Print formatting helpers
          const array_to_capital_string = (array) => {
            return (array.map((word) => { 
              return word[0].toUpperCase() + word.substring(1); 
            }).join(", "));
          }
          const capitalizeString = (str) => {
            return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
          }
          // Image data
          let imgUrl = getImageURL(bowl.name);
          let altText = `Image of ${bowl.name} meal.`;
          // This is where the card is returned.
          return(
            renderOkay &&
            <li key={element_id}>
              <h4>{bowl.name}</h4>
              {(bowl.vegan || bowl.gluten_free) && <p>({bowl_status})</p>}
              <img alt={altText} src={imgUrl} style={{maxWidth:'300px'}}/>
              <dl>
                <dt>Base:</dt>
                <dd>{capitalizeString(bowl.base)}</dd>
                <dt>{(bowl.protein.length > 1)?"Proteins":"Protein"}</dt>
                <dd>{array_to_capital_string(bowl.protein)}</dd>
                <dt>{(bowl.sauce.length > 1)?"Sauces":"Sauce"}</dt>
                <dd>{array_to_capital_string(bowl.sauce)}</dd>
                <dt>{(bowl.topping.length > 1)?"Toppings":"Topping"}</dt>
                <dd>{array_to_capital_string(bowl.topping)}</dd>
                <dt>Price:</dt>
                <dd>{formatter.format(bowl.price)}</dd>
                <form onSubmit={ (e) => {
                  e.preventDefault();
                  addPremadeBowl(bowl.name);
                }}>
                  <input type="submit" value="Add To Cart" />
                </form>
              </dl>
            </li>
          );
        })}
      </ul>
      <h3>Order a Custom Bowl:</h3>
      <img alt={"Custom Bowl"} src={'imgs/bowl_custom.png'} style={{maxWidth:'300px'}}/>
      <form onSubmit={addCustomBowl}>

        <label>
          Select a Base (Pick One):
          <br />
          <select name="base" id="base">
            <option value="white rice">White Rice</option>
            <option value="brown rice">Brown Rice</option>
            <option value="quinoa">Quinoa</option>
            <option value="egg noodles">Egg Noodles</option>
          </select>
        </label>

        <br />
        <label>
          Select Number of Proteins:
          <br />
          <select name="numProtein" id="numProtein" 
          onChange={(e)=>{setNumProtein(Number.parseInt(e.target.value));}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <ul>
          <li>
            <label>
              Select Protein 1:
              <br />
              <select name="protein_1" id="protein_1">
                <option value="chicken">Chicken</option>
                <option value="steak">Steak</option>
                <option value="beyond meat">Beyond Meat (Vegan)</option>
                <option value="salmon">Salmon (Raw)</option>
                <option value="tuna">Tuna (Raw)</option>
                <option value="eel">Eel (Contains Gluten)</option>
              </select>
            </label>
          </li>
          {(numProtein>=2) && 
          <li>
            <label>
              Select Protein 2:
              <br />
              <select name="protein_2" id="protein_2">
                <option value="chicken">Chicken</option>
                <option value="steak">Steak</option>
                <option value="beyond meat">Beyond Meat (Vegan)</option>
                <option value="salmon">Salmon (Raw)</option>
                <option value="tuna">Tuna (Raw)</option>
                <option value="eel">Eel (Contains Gluten)</option>
              </select>
            </label>
          </li>
          }
          {(numProtein>=3) && 
          <li>
            <label>
              Select Protein 3:
              <br />
              <select name="protein_3" id="protein_3">
                <option value="chicken">Chicken</option>
                <option value="steak">Steak</option>
                <option value="beyond meat">Beyond Meat (Vegan)</option>
                <option value="salmon">Salmon (Raw)</option>
                <option value="tuna">Tuna (Raw)</option>
                <option value="eel">Eel (Contains Gluten)</option>
              </select>
            </label>
          </li>
          }
        </ul>
        <label>
          Select a Sauce (Pick One):
          <br />
          <select defaultValue={"poke sauce"} name="sauce" id="sauce">
            <option value="sour cream">Sour Cream (Gluten-Free)</option>
            <option value="poke sauce">Poke Sauce (Vegan)</option>
            <option value="teriyaki sauce">Teriyaki (Vegan)</option>
            <option value="sweet and sour sauce">Sweet &amp; Sour (Vegan, Gluten-Free)</option>
            <option value="spicy mayo">Spicy Mayo</option>
          </select>
        </label>
        <br />
        <label>
          Select Number of Toppings:
          <br />
          <select name="numTopping" id="numTopping" 
          onChange={(e)=>{setNumTopping(Number.parseInt(e.target.value));}}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </label>
        <ul>
          <li>
            <label>
              Select Topping 1:
              <br />
              <select name="topping_1" id="topping_1">
                <option value="romaine lettuce">Romaine Lettuce</option>
                <option value="tomato">Tomato</option>
                <option value="corn">Corn</option>
                <option value="cucumber">Cucumber</option>
                <option value="avocado">Avocado</option>
                <option value="green pepper">Green Pepper</option>
                <option value="sweet onion">Sweet Onion</option>
                <option value="carrot">Carrot</option>
                <option value="pineapple">Pineapple</option>
                <option value="cheese">Cheese (Non-Vegan)</option>
                <option value="guacamole">Guacamole</option>
                <option value="kani salad">Kani Salad</option>
                <option value="seaweed salad">Seaweed Salad</option>
              </select>
            </label>
          </li>
          {(numTopping>=2) && 
          <li>
            <label>
              Select Topping 2:
              <br />
              <select name="topping_2" id="topping_2">
                <option value="romaine lettuce">Romaine Lettuce</option>
                <option value="tomato">Tomato</option>
                <option value="corn">Corn</option>
                <option value="cucumber">Cucumber</option>
                <option value="avocado">Avocado</option>
                <option value="green pepper">Green Pepper</option>
                <option value="sweet onion">Sweet Onion</option>
                <option value="carrot">Carrot</option>
                <option value="pineapple">Pineapple</option>
                <option value="cheese">Cheese (Non-Vegan)</option>
                <option value="guacamole">Guacamole</option>
                <option value="kani salad">Kani Salad</option>
                <option value="seaweed salad">Seaweed Salad</option>
              </select>
            </label>
          </li>
          }
          {(numTopping>=3) && 
          <li>
            <label>
              Select Topping 3:
              <br />
              <select name="topping_3" id="topping_3">
                <option value="romaine lettuce">Romaine Lettuce</option>
                <option value="tomato">Tomato</option>
                <option value="corn">Corn</option>
                <option value="cucumber">Cucumber</option>
                <option value="avocado">Avocado</option>
                <option value="green pepper">Green Pepper</option>
                <option value="sweet onion">Sweet Onion</option>
                <option value="carrot">Carrot</option>
                <option value="pineapple">Pineapple</option>
                <option value="cheese">Cheese (Non-Vegan)</option>
                <option value="guacamole">Guacamole</option>
                <option value="kani salad">Kani Salad</option>
                <option value="seaweed salad">Seaweed Salad</option>
              </select>
            </label>
          </li>
          }
        </ul>

        <h4>Price:</h4>
        <p>{formatter.format( 12 + 3 * (numProtein - 1) )}</p>

        <input type="submit" value="Add To Cart" />
      </form>
    </div>
  );
}

export default Order;

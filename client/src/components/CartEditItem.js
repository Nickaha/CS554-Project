import React, { useState, useEffect } from "react";
import {useDispatch} from 'react-redux';
import actions from '../actions';
import '../App.css';

function CartEditItem(props) {
    const [numProtein, setNumProtein] = useState(1);
    const [numTopping, setNumTopping] = useState(1);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const formatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD'});

    useEffect( ()=>{
        setNumProtein(props.bowl.protein.length);
        setNumTopping(props.bowl.topping.length);
    }, [props.bowl] )

    // Helper to know if a bowl is custom.
    const isCustom = (name) =>{
        switch (name){
          case 'Gold Standard Chicken':
            return false;
          case 'Fish Lover':
            return false;
          case 'I Love Chipotle':
            return false;
          case 'No Meat For Me':
            return false;
          default:
            return true;
        }
    }

    // Helper for when we exchange premade bowls.
    const getPremadeBowl = (name) =>{
        switch (name){
          case 'Gold Standard Chicken':
            return({
              name: 'Gold Standard Chicken',
              base: 'white rice',
              protein: ['chicken'],
              topping: ['sweet onion', 'green pepper', 'pineapple'],
              sauce: ['teriyaki sauce'],
              price: 11.00
            });
          case 'Fish Lover':
            return({
              name: 'Fish Lover',
              base: 'white rice',
              protein: ['salmon', 'tuna'],
              topping: ['corn', 'cucumber', 'kani salad', 'seaweed salad'],
              sauce: ['poke sauce'],
              price: 14.70
            });
          case 'I Love Chipotle':
            return({
              name: 'I Love Chipotle',
              base: 'brown rice',
              protein: ['steak'],
              topping: ['romaine lettuce', 'cheese', 'guacamole'],
              sauce: ['sour cream'],
              price: 13.40
            });
          case 'No Meat For Me':
            return({
              name: 'No Meat For Me',
              base: 'brown rice',
              protein: ['beyond meat', 'fried tofu'],
              topping: ['romaine lettuce', 'sweet onion', 'green pepper'],
              sauce: ['teriyaki sauce'],
              price: 14.40
            });
          default:
            throw new Error(`Error: No order found for ${name}.`);
        }
      }

    const updateItem = (id, new_bowl) =>{
        if ((!id) ||
            (!new_bowl.name || typeof(new_bowl.name) !== 'string') || 
            (!new_bowl.base || typeof(new_bowl.base) !== 'string') ||
            (!new_bowl.price || typeof(new_bowl.price) !== 'number') ||
            (!new_bowl.protein || !Array.isArray(new_bowl.protein) || new_bowl.protein.length === 0) ||
            (!new_bowl.topping || !Array.isArray(new_bowl.topping) || new_bowl.topping.length === 0) ||
            (!new_bowl.sauce || !Array.isArray(new_bowl.sauce) || new_bowl.sauce.length === 0)
        ){
        console.log("Error: Mis-formatted order update not placed:");
        console.log(id, new_bowl);
        }else{
            dispatch(actions.editItemInCart(
                id,
                new_bowl.name,
                new_bowl.base,
                new_bowl.protein,
                new_bowl.topping,
                new_bowl.sauce,
                new_bowl.price
            ));
        }
        
    };

    const updateCustom = (e) =>{
        e.preventDefault();
        setShow(false);

        let proteins = [];
        let toppings = [];

        proteins.push(e.target.protein_1.value);
        if (numProtein >= 2) proteins.push(e.target.protein_2.value);
        if (numProtein >= 3) proteins.push(e.target.protein_3.value);

        toppings.push(e.target.topping_1.value);
        if (numTopping >= 2) toppings.push(e.target.topping_2.value);
        if (numTopping >= 3) toppings.push(e.target.topping_3.value);
        updateItem(
            props.bowl.id,
            {
            name: 'Custom Bowl',
            base: e.target.base.value,
            protein: proteins,
            topping: toppings,
            sauce: [e.target.sauce.value],
            price: 12 + 3 * (numProtein - 1)
        })

    }

    const updatePrebuilt = (e) =>{
        e.preventDefault();
        setShow(false);
        let new_bowl_name = e.target.bowl_name.value;
        updateItem(props.bowl.id, getPremadeBowl(new_bowl_name));
    }

    if (props.bowl){
        if (show){
            if (isCustom(props.bowl.name)){
                // Edit Custom Bowl:

                let protein_1 = props.bowl.protein[0];
                let protein_2 = (props.bowl.protein.length >= 2? props.bowl.protein[1] : "chicken" );
                let protein_3 = (props.bowl.protein.length >= 3? props.bowl.protein[2] : "chicken" );

                let topping_1 = props.bowl.topping[0];
                let topping_2 = (props.bowl.topping.length >= 2? props.bowl.topping[1] : "romaine lettuce" );
                let topping_3 = (props.bowl.topping.length >= 3? props.bowl.topping[2] : "romaine lettuce" );

                // Determine if proteins/toppings are selected.
                return (
                    <form onSubmit={updateCustom}>
                        <button 
                        onClick={(e)=>{ e.preventDefault(); setShow(false) }}
                        >Cancel Edit</button>
                        <br/>
                        <label>
                        Select a Base (Pick One):
                        <br />
                        <select defaultValue={props.bowl.base} name="base" id="base">
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
                        <select defaultValue={numProtein.toString()} name="numProtein" id="numProtein" 
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
                            <select defaultValue={protein_1} name="protein_1" id="protein_1">
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
                            <select defaultValue={protein_2} name="protein_2" id="protein_2">
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
                            <select defaultValue={protein_3} name="protein_3" id="protein_3">
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
                        <select defaultValue={props.bowl.sauce[0]} name="sauce" id="sauce">
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
                        <select defaultValue={numTopping.toString()} name="numTopping" id="numTopping" 
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
                            <select defaultValue={topping_1} name="topping_1" id="topping_1">
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
                            <select defaultValue={topping_2} name="topping_2" id="topping_2">
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
                            <select defaultValue={topping_3} name="topping_3" id="topping_3">
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

                        <p> 
                            New Price:
                            <br/>
                            {formatter.format( 12 + 3 * (numProtein - 1) )}
                        </p>

                        <input type="submit" value="Edit Order" />
                    </form>)
            }else{
                return (
                    <form onSubmit={updatePrebuilt}>
                        <button 
                        onClick={(e)=>{ e.preventDefault(); setShow(false) }}
                        >Cancel Edit</button>
                        <br />
                        <label>
                            Select Prebuilt Bowl:
                            <br />
                            <select defaultValue={props.bowl.name} name="bowl_name" id="bowl_name">
                                <option value="Gold Standard Chicken">Gold Standard Chicken</option>
                                <option value="Fish Lover">Fish Lover</option>
                                <option value="I Love Chipotle">I Love Chipotle</option>
                                <option value="No Meat For Me">No Meat For Me</option>
                            </select>
                        </label>
                        <br />
                        <input type="submit" value="Edit Order" />
                    </form>)
            }
        }else{
            return (
                <button 
                onClick={(e)=>{ e.preventDefault(); setShow(true) }}
                >Edit</button>
            )
        }
    }else{
        return(<button>loading...</button>);
    }
}

export default CartEditItem;

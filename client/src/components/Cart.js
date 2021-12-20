import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../actions";
import CartEditItem from "./CartEditItem";
import "../App.css";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const deleteItem = (id) => {
    console.log("Deleting ID", id);
    dispatch(actions.deleteFromCart(id));
  };

  const getImageURL = (name) => {
    switch (name) {
      case "Gold Standard Chicken":
        return "/imgs/bowl_chicken.jpg";
      case "Fish Lover":
        return "/imgs/bowl_fish.jpg";
      case "I Love Chipotle":
        return "/imgs/bowl_chipotle.jpg";
      case "No Meat For Me":
        return "/imgs/bowl_vegan.jpg";
      default:
        return "imgs/bowl_custom.png";
    }
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  let totalcost = 0;
  return (
    <div className="cartdiv">
      <h2>Your Cart:</h2>
      {cart.length > 0 ? (
        <ul className="bowl-list">
          {cart?.map((bowl, idx) => {
            //Add the price to our total cost
            totalcost += bowl.price;
            //Unique key for list entry
            let element_id = "bowl" + idx;
            // Print formatting helpers
            const array_to_capital_string = (array) => {
              return array
                .map((word) => {
                  return word[0].toUpperCase() + word.substring(1);
                })
                .join(", ");
            };
            const capitalizeString = (str) => {
              return str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                letter.toUpperCase()
              );
            };
            // Image data
            let imgUrl = getImageURL(bowl.name);
            let altText = `Image of ${bowl.name} meal.`;
            // This is where the card is returned.
            return (
              <li key={element_id} className="orderul">
                <h3>{bowl.name}</h3>
                <img alt={altText} src={imgUrl} className="cartimg" />
                <dl>
                  <dt>Base:</dt>
                  <dd>{capitalizeString(bowl.base)}</dd>
                  <dt>{bowl.protein.length > 1 ? "Proteins" : "Protein"}</dt>
                  <dd>{array_to_capital_string(bowl.protein)}</dd>
                  <dt>{bowl.sauce.length > 1 ? "Sauces" : "Sauce"}</dt>
                  <dd>{array_to_capital_string(bowl.sauce)}</dd>
                  <dt>{bowl.topping.length > 1 ? "Toppings" : "Topping"}</dt>
                  <dd>{array_to_capital_string(bowl.topping)}</dd>
                  <dt>Price:</dt>
                  <dd>{formatter.format(bowl.price)}</dd>

                  <CartEditItem bowl={bowl} />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      deleteItem(bowl.id);
                    }}
                  >
                    <input
                      type="submit"
                      value="Delete From Cart"
                      className="deltocart"
                    />
                  </form>
                </dl>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <p>No items in cart.</p>
          <Link to="/order">
            <button>Go to Order</button>
          </Link>
        </div>
      )}
      {cart.length > 0 && (
        <div>
          <h3>Total Order Cost: {formatter.format(totalcost)}</h3>
          <Link to="/checkout">
            <button className="addtocart">Go to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;

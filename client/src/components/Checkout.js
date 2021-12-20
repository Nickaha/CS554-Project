import {
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import actions from "../actions";
import "../App.css";
import { Link } from "react-router-dom";
import "../App.css";
import axios from "axios";
const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    height: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 5,
    border: "1px solid #1e8678",
    boxShadow: "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
  },
  titleHead: {
    borderBottom: "1px solid #1e8678",
    fontWeight: "bold",
  },
  grid: {
    flexGrow: 1,
    flexDirection: "row",
  },
  media: {
    height: "100%",
    width: "100%",
  },
  button: {
    color: "#faf0e6",
    fontWeight: "bold",
    fontSize: 12,
    background: "#440f2b",
  },
});

function Checkout() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  console.log("User ID:", user.id);
  let tp = 0; //Reducer to get total price.

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
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const classes = useStyles();
  const [confirm, setConfirm] = useState(false);
  orders.forEach((bowl) => {
    tp += bowl.price;
  });
  const deleteItem = (id) => {
    dispatch(actions.deleteFromCart(id));
  };
  async function confirmOrders(orders) {
    setConfirm(true);
    for (const order of orders) {
      let post_order = {
        user_id: user.id,
        name: order.name,
        base: order.base,
        protein: order.protein,
        topping: order.topping,
        sauce: order.sauce,
      };
      await axios.post("http://localhost:3001/order/post", post_order);
      deleteItem(order.id);
    }
    const { data } = await axios.get("http://localhost:3001/order");
    orders = data;
  }
  const buildCard = (order) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={order.id}>
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <Typography
              className={classes.titleHead}
              gutterBottom
              variant="h6"
              component="h2"
            >
              {order.name}
            </Typography>
            <strong>Base:</strong>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {capitalizeString(order.base)}
            </Typography>
            <strong>Protein:</strong>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {array_to_capital_string(order.protein)}
            </Typography>
            <strong>Topping:</strong>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {array_to_capital_string(order.topping)}
            </Typography>
            <strong>Sauce:</strong>
            <br />
            <Typography variant="body2" color="textSecondary" component="p">
              {array_to_capital_string(order.sauce)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  let card = null;
  card =
    orders &&
    orders.map((order) => {
      return buildCard(order);
    });
  return (
    <div className="orderdiv">
      <h2>Checkout</h2>
      <Grid container className={classes.grid} spacing={5}>
        {card}
      </Grid>
      <br />
      {tp > 0 && <h3>Total price: {formatter.format(tp)}</h3>}

      {confirm ? (
        <div>
          <p>Order Confirmed!</p>
          <Link className="addtocart" to={"/pickup"}>
                Pick up your order
          </Link>
          <br />
          <Link to={"/delivery"} className="addtocart">Delivery
          </Link>
        </div>
      ) : (
        <button
          className="addtocart"
          onClick={() => {
            confirmOrders(orders);
          }}
        >
          Confirm your order
        </button>
      )}
    </div>
  );
}

export default Checkout;

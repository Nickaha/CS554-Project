import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Map from "./Map";
import React, { useState,useEffect } from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    makeStyles
  } from '@material-ui/core';

  const useStyles = makeStyles({
    card: {
      maxWidth: 250,
      height: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      borderRadius: 5,
      border: '1px solid #1e8678',
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
    },
    titleHead: {
      borderBottom: '1px solid #1e8678',
      fontWeight: 'bold'
    },
    grid: {
      flexGrow: 1,
      flexDirection: 'row'
    },
    media: {
      height: '100%',
      width: '100%'
    },
    button: {
      color: '#faf0e6',
      fontWeight: 'bold',
      fontSize: 12,
      background:'#440f2b'
    }
  });
function Deliver(){
    //const orders = useSelector( (state) => state.cart );
    const classes = useStyles();
    const [orderData, setOrderData] = useState(undefined);
    const [time, setTime] = useState(Date.now());
    const user = useSelector( (state) => state.user );
    
    
    // Print formatting helpers
    const array_to_capital_string = (array) => {
        return (array.map((word) => { 
                return word[0].toUpperCase() + word.substring(1); 
            }).join(", "));
    }
    const capitalizeString = (str) => {
        return str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    }


    let readyToDeliver = false;
    const buildCard = (order,served) => {
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {capitalizeString(order.base)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {array_to_capital_string(order.protein)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {array_to_capital_string(order.topping)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {array_to_capital_string(order.sauce)}
                    </Typography>
                    </CardContent>
                    {
                    served === true ?
                    <p>Your order is ready to be deliverd</p>:
                    <p>Your order is still preparing</p>
                    }       
            </Card>
            </Grid>
        );
    };
    useEffect(() => {
        console.log('on load useeffect');
        async function fetchData() {
            try {
                const { data } = await axios.get("http://localhost:3001/order");
                console.log(data);
                if (data){
                    setOrderData(data);
                } 
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();

        // do this to always refresh
        const interval = setInterval(() => setTime(Date.now()), 5000);
        console.log(time)
        return () => {
            clearInterval(interval)
        }
    }, [time]);

    if(!orderData){
        return (
            <div>
                <p className="text-message">There is no order to pick up. Please go select your meal :)</p>
                <Link to={"/order"}>Start your order here!</Link>
            </div>
        );
    } else{
        
        
        let card = null;

        let orderCount = 0;

        card =
        orderData &&
        orderData.map((order) => {
            // let served = null;
            // orderData.forEach(x=>{
            //     if(order.id === x.id) served = x.served;
            // });
            if (order.user_id.toString() === user.id.toString()){
                orderCount += 1;
                return buildCard(order,order.served);
            }else{
                return "";
            }
            
        });
        readyToDeliver=true;
        orderData.forEach(x=>{
            if(x.user_id.toString()===user.id.toString() && x.served===false){
                readyToDeliver=false;
            }
        });
        if(orderCount === 0){
            return (
                <div>
                    <p className="text-message">There is no order to pick up. Please go select your meal :)</p>
                    <Link to={"/order"}><button>Start your order here!</button></Link>
                </div>
            );
        }else {
            return (
                <div>
                <Grid container className={classes.grid} spacing={5}>
                    {card}
                </Grid>
                {
                    readyToDeliver?
                    // <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.780551987794!2d-74.02614568434377!3d40.74485404354159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259dc1f3d30a5%3A0x8375b030590cc06f!2sWesley%20J.%20Howe%20Center%2C%201%20Castle%20Point%20Terrace%2C%20Hoboken%2C%20NJ%2007030!5e0!3m2!1sen!2sus!4v1639952657901!5m2!1sen!2sus" width="600" height="450"  allowFullScreen="" loading="lazy"></iframe>:
                    <Map></Map>:
                    <p>Still waiting for the order to be done</p>
                }
                </div>
            );
        }
    }
    
}

export default Deliver;
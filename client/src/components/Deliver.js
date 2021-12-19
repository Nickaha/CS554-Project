import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState,useEffect } from 'react';
import Map from "./Map";
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
                        {order.base}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {order.protein}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {order.topping}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {order.sauce}
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
    }, []);
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //       console.log('This will run every second!');
    //     }, 1000);
    //     return () => clearInterval(interval);
    //   }, []);
    if(!orderData){
        return (
            <div>
                <p className="text-message">There is no order to pick up. Please go select your meal :)</p>
                <Link to={"/order"}>Start your order here!</Link>
            </div>
        );
    } else{
        
        
        let card = null;

        card =
        orderData &&
        orderData.map((order) => {
            // let served = null;
            // orderData.forEach(x=>{
            //     if(order.id === x.id) served = x.served;
            // });
            return buildCard(order,order.served);
        });
        readyToDeliver=true;
        orderData.forEach(x=>{
            if(x.served===false){
                readyToDeliver=false;
            }
        });
        return (
            <div>
            <Grid container className={classes.grid} spacing={5}>
                {card}
            </Grid>
            {
                readyToDeliver?
                <Map />:
                <p>Still waiting for the order to be done</p>
            }
            </div>
        );
    }
    
}

export default Deliver;
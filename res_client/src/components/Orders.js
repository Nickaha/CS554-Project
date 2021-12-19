import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

import '../App.css';
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

const Orders = () => {
    const regex = /(<([^>]+)>)/gi;
    const classes = useStyles();
    const [orderData, setOrderData] = useState(undefined);
    const [counter, setCounter] = useState(0);
    const [time, setTime] = useState(Date.now());
    let card = null;

    async function serve_food(order){
        console.log(order);
        setCounter(counter+1);
        console.log(counter);
        order.served = true;
        await axios.patch("http://localhost:3001/order/patch",{
            served:order.served,
            id: order.id
        });
        
    }
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

        // do this to always refresh new orders
        const interval = setInterval(() => setTime(Date.now()), 1000);
        console.log(time)
        return () => {
            clearInterval(interval)
        }
    }, [time]);


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
                        order.served == true ?
                        <p>Served</p>:
                        <button className={classes.button} onClick={()=>{console.log(order);serve_food(order)}}> Ready </button>
                        
                    }
            </Card>
            </Grid>
        );
        };
        
        card =
            orderData &&
            orderData.map((order) => {
              return buildCard(order);
            });
        // var pagenum = parseInt(props.match.params.pagenum);
        // if(pagenum < 0 || pagenum>=38){
        //     return(
        //         <div>
        //             <Redirect to='/notfound'/>
        //         </div>
        //     );
        // }

        return (
            <div>
            <br />
            <br />
            <Grid container className={classes.grid} spacing={5}>
                {card}
            </Grid>
            </div>
        );
}

export default Orders;
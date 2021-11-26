import { Alert, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const BuyProduct = () => {
    const history = useHistory();
    const { user } = useAuth();
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [orderData, setOrderData] = useState({ name: user.displayName, email: user.email });
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`https://stark-beach-85559.herokuapp.com/products/${productId}`)
            .then(res => res.json())
            .then(data => setProduct(data));
    }, [productId]);

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...orderData };
        newLoginData[field] = value;
        setOrderData(newLoginData);
    }

    const handleOrderProductSubmit = e => {
        e.preventDefault();
        if (!orderData.phone || !orderData.address) {
            setError("All fields are required!");
            return;
        }
        setError("");

        orderData.isActive = false;
        orderData.productId = product._id;
        orderData.productName = product.name;
        orderData.price = product.price;

        axios.post('https://stark-beach-85559.herokuapp.com/orders', orderData)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire(
                        'Success!',
                        'Your order added successfully!',
                        'success'
                    );
                    setOrderData({});
                    e.target.reset();
                    history.push('/');
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire(
                    'Failed!',
                    'Something Went wrong!',
                    'error'
                );
            });
    }

    return (
        <Container>
            <Grid container spacing={2} sx={{ my: 2 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="320"
                                image={product.image}
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom variant="h6" component="div">
                                $ {product.price}
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>Place Your Order!</Typography>
                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleOrderProductSubmit}>
                        <TextField
                            disabled
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            name="name"
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            variant="standard" />

                        <TextField
                            disabled
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            variant="standard" />

                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Phone"
                            name="phone"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Address"
                            name="address"
                            variant="standard"
                            onBlur={handleOnBlur}
                            rows={3}
                            multiline />

                        <Button sx={{ width: '100%', mb: 1 }} type="submit" variant="contained">Order Confirm</Button>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default BuyProduct;
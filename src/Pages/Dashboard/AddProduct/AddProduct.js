import { Alert, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [productData, setProductData] = useState({});
    const [error, setError] = useState("");

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...productData };
        newLoginData[field] = value;
        setProductData(newLoginData);
    }

    const handleAddProductSubmit = e => {
        e.preventDefault();
        const { description, image, name, price } = productData;
        if (!description || !image || !name || !price) {
            setError("All fields are required!");
            return;
        }
        setError("");

        axios.post('https://stark-beach-85559.herokuapp.com/products', productData)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire(
                        'Success!',
                        'New product added successfully!',
                        'success'
                    );
                    setProductData({});
                    e.target.reset();
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
            <Grid container spacing={2}>
                <Grid item sx={{ margin: '30px auto' }} xs={10} md={5}>
                    <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>Add New Product!</Typography>
                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleAddProductSubmit}>
                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Product Name"
                            name="name"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Product Description"
                            name="description"
                            variant="standard"
                            onBlur={handleOnBlur}
                            rows={3}
                            multiline />

                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Product Price"
                            name="price"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Product Image"
                            name="image"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '100%', mb: 1 }} type="submit" variant="contained">Add Product</Button>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddProduct;
import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { CircularProgress, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import Product from '../Product/Product';

const Products = () => {
    const [products, setProducts] = React.useState([]);
    const [isLoadData, setIsLoadData] = React.useState(false);

    React.useEffect(() => {
        setIsLoadData(true);
        fetch('https://stark-beach-85559.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setIsLoadData(false);
            })
    }, []);

    return (
        !isLoadData ?
            <Box sx={{ flexGrow: 1, mb: 4 }}>
                <Container>
                    <Typography sx={{ fontWeight: 700, my: 4, textAlign: 'center', color: 'success.main' }} variant="h4" component="div">
                        OUR PRODUCTS
                    </Typography>

                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            products.map(product => <Product
                                key={product._id}
                                product={product}
                            ></Product>)
                        }
                    </Grid>
                </Container>
            </Box>
            :
            <>
                <CircularProgress />
            </>
    );
};

export default Products;
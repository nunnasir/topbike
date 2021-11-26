import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Button } from '@mui/material';
import BannerImage from '../../../images/banner.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <Container>
            <Grid container spacing={4} sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
                <Grid item xs={12} md={6}>
                    <img src={BannerImage} style={{ width: '100%' }} alt="" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="div" sx={{ mb: 4 }}>
                        Innovating to Reimagine riding bicycle
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        Phasellus eget condimentum nibh. Nunc id enim id velit commodo efficitur. Duis auctor, mauris in maximus cursus, purus neque ultricies velit
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4 }}>
                        Vivamus a turpis nisi. Fusce feugiat feugiat congue in mauris id sollicitudin.
                    </Typography>
                    <Link style={{ textDecoration: 'none' }} to="/products">
                        <Button variant="contained">Buy Now</Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Banner;
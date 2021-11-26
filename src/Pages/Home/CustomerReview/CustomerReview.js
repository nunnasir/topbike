import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Container, Typography } from '@mui/material';
import Review from '../Review/Review';

const CustomerReview = () => {
    const [reviews, setReviews] = React.useState([]);

    React.useEffect(() => {
        fetch('https://stark-beach-85559.herokuapp.com/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data.reviews);
            })
    }, []);

    return (
        <Box sx={{ flexGrow: 1, mb: 4 }}>
            <Container>
                <Typography sx={{ fontWeight: 700, my: 4, textAlign: 'center', color: 'success.main' }} variant="h4" component="div">
                    CUSTOMER REVIEW
                </Typography>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    {
                        reviews.map(review => <Review
                            key={review._id}
                            review={review}
                        ></Review>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default CustomerReview;
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import Rating from '@mui/material/Rating';

const Review = (props) => {
    const { name, rating, comments } = props.review;
    return (
        <Grid item xs={2} sm={3} md={3}>
            <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        readOnly
                    />
                    <Typography variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2">
                        {comments}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Review;
import { Alert, Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Rating from '@mui/material/Rating';
import useAuth from '../../../hooks/useAuth';

const ReviewPlace = () => {
    const [comments, setComments] = useState("");
    const [error, setError] = useState("");
    const [ratingValue, setratingValue] = React.useState(0);
    const { user } = useAuth();

    const handleOnBlur = e => {
        setComments(e.target.value);
    }

    const handleAddReview = e => {
        e.preventDefault();
        if (!comments) {
            setError("Comments fields are required!");
            return;
        }
        setError("");

        const userReview = {
            email: user.email,
            name: user.displayName,
            rating: ratingValue,
            comments: comments
        };

        axios.post('https://stark-beach-85559.herokuapp.com/reviews', userReview)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire(
                        'Success!',
                        'New review added successfully!',
                        'success'
                    );
                    setComments("");
                    setratingValue(0);
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
                    <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>Place Your Review!</Typography>
                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleAddReview}>
                        <Rating
                            name="simple-controlled"
                            value={ratingValue}
                            onChange={(event, newValue) => {
                                setratingValue(newValue);
                            }}
                        />
                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Comment"
                            name="comments"
                            variant="standard"
                            onBlur={handleOnBlur}
                            rows={3}
                            multiline />
                        <Button sx={{ width: '100%', mb: 1 }} type="submit" variant="contained">Place Review</Button>
                    </form>
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default ReviewPlace;
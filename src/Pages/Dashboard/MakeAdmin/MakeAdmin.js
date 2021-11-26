import { Button, TextField, Alert, Container, Grid, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleOnBlur = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('https://stark-beach-85559.herokuapp.com/users/admin', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    setSuccess(true);
                    setError("");
                }
                else {
                    setError("Something wen wrong! please try again!")
                }
            })

        e.preventDefault()
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ margin: '30px auto' }} xs={10} md={5}>
                    <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>Make an Admin!</Typography>
                    <Divider sx={{ mb: 3 }} />

                    <form onSubmit={handleAdminSubmit}>
                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            label="Email"
                            type="email"
                            name="email"
                            onBlur={handleOnBlur}
                            variant="standard" />

                        <Button sx={{ width: '100%', mb: 1 }} type="submit" variant="contained">Make Admin</Button>
                    </form>
                    {success && <Alert severity="success">Made Admin successfully!</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Grid>
            </Grid>
        </Container>
    );
};

export default MakeAdmin;
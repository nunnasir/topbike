import { Container, Typography, TextField, Button, CircularProgress, Alert, Divider } from '@mui/material';
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';
import logo from '../../../images/logo.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, loginUser, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        loginUser(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history)
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ margin: '30px auto' }} xs={10} md={5}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={logo} alt="" style={{ width: '20%' }} />
                    </div>
                    <Typography sx={{ textAlign: 'center' }} variant="body1" gutterBottom>Great to have you back!</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Email"
                            name="email"
                            onBlur={handleOnChange}
                            variant="standard" />
                        <TextField
                            sx={{ width: '100%', mb: 1 }}
                            id="standard-basic"
                            label="Your Password"
                            type="password"
                            name="password"
                            onBlur={handleOnChange}
                            variant="standard" />

                        <Button sx={{ width: '100%', mb: 1 }} type="submit" variant="contained">Login</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to="/register">
                            <Button variant="text">Dont Have Account? Register Now</Button>
                        </NavLink>
                        {isLoading && <CircularProgress />}
                        {user?.email && <Alert severity="success">Login successfully!</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </form>
                    <Divider sx={{ mb: 3 }} />
                    <Button style={{ width: '100%', borderRadius: '50px' }} onClick={handleGoogleSignIn} variant="contained">Google Sign In</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
import { Container, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#473b3b', color: '#d1c8c8', padding: '20px 0', textAlign: 'right' }}>
            <Container>
                <Typography variant="body2">
                    {new Date().getFullYear()} TOPBIKE. All rights reserved
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
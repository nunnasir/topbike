import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Feature_1 from '../../../images/f1.png';
import Feature_2 from '../../../images/f2.png';
import Feature_3 from '../../../images/f3.png';
import Feature_4 from '../../../images/f4.png';
import Feature from '../Feature/Feature';

const features = [
    {
        name: 'Light weight',
        description: 'Nunc consequat nibh ut pretium vestibulum nulla facilisi.',
        img: Feature_1
    },
    {
        name: 'Colors wide range',
        description: 'Morbi in risus in nisi eleifend convallis. Etiam pretium erat volutpat.',
        img: Feature_2
    },
    {
        name: 'Aerograde aluminium',
        description: 'Etiam tempor facilisis turpis et condimentum pharetra erat.',
        img: Feature_3
    },
    {
        name: 'Colours wide range',
        description: 'Interdum sedtrium annium erior malesuada ipsum primis.',
        img: Feature_4
    }
]

const Features = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography sx={{ fontWeight: 700, my: 4, textAlign: 'center', color: 'success.main' }} variant="h4" component="div">
                    SPECIAL FEATURES
                </Typography>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                    {
                        features.map(feature => <Feature
                            key={feature.name}
                            feature={feature}
                        ></Feature>)
                    }
                </Grid>
            </Container>
        </Box>
    );
};

export default Features;
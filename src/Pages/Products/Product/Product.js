import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useHistory } from 'react-router';

const Product = (props) => {
    const history = useHistory();
    const { _id, name, price, image, description } = props.product;

    const buyNowHandler = () => {
        history.push(`buyProduct/${_id}`)
    }

    return (
        <Grid item xs={4} sm={4} md={4}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="240"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description.substring(0, 200)}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h6" component="div">
                        $ {price}
                    </Typography>
                    <Button size="small" onClick={buyNowHandler}>BUY NOW</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Product;
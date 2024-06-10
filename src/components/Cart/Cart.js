// CartPage.js
import React, { useState } from 'react';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    IconButton,
    Grid,
    Paper,
    Button,
    ButtonGroup,
    Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ items, onRemoveItem, onCheckout, onContinueShopping }) => {
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();
    const goToShoping = () => {
        navigate('/');
    };
    // const qty = 1;
    const calculateTotal = () => {
        return items.reduce((acc, item) => acc + item.price * qty, 0).toFixed(2);
    };
    const handleIncrement = (productId) => {        
        // setQty(prevCart => ({
        //     ...prevCart,
        //     [productId]: (prevCart[productId] || 0) + 1
        // }));
        setQty(qty + 1);
    };
    const handleDecrement = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };
    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>
            <Paper elevation={3}>
                <List>
                    {items.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar src={item.image} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={`Price: $${item.price}`}
                                />
                                <ButtonGroup size="small" aria-label="small button group">
                                    <Button onClick={() => handleIncrement(item.id)}>+</Button>
                                    <Button disabled>{qty}</Button>
                                    <Button onClick={handleDecrement}>-</Button>
                                </ButtonGroup>
                                <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItem(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                            {index < items.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                <Grid item>
                    <Button variant="outlined" onClick={goToShoping}>
                        Continue Shopping
                    </Button>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Total: ${calculateTotal()}</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </Container>

    );
};

export default CartPage;
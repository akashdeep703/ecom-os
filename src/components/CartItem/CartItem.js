import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './CardItem.css'
import {
  Typography,
  CardContent,
  CardActions,
  CardMedia,
  CardHeader,
  Card,
  IconButton,
  Toolbar,
  AppBar,
  Stack,
  Box,
} from '@mui/material';
import { AddShoppingCart, Person, Share, Menu, ShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
export default function CardLayout(props) {
  const [cart, setCart] = useState(0);
  const navigate = useNavigate();
  const goToCart = () => {
    navigate('/cart');
  };
  const handleAddToCart = () => {
    // Update cart item quantity
    setCart(cart + 1);
  }
  function appBarLabel(label) {
    return (
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
      </Toolbar>
    );
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });
  return (
    <Box>
      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" color="primary" enableColorOnDark>
            {appBarLabel('Products')}
            <Box className='cart-icon-count'>
              {cart}
            </Box>
            <Box className='cart-icon-login'>
              <Person />
            </Box>
            <Box className='cart-icon-cart'>
              <ShoppingCart onClick={goToCart} />
            </Box>
          </AppBar>
        </ThemeProvider>
      </Stack>
      <Box className='card'>
        {
          props.items.map(product => (
            <Card
              key={product.id}
              sx={{ maxWidth: 370, marginTop: "15px" }}>
              <CardHeader
                title={product.name}
                subheader="Last Purchased: Sep 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                // width="10px"
                image="https://www.w3schools.com/html/images/13_html_images.png"
                alt="html"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>

              </CardContent>
              <CardActions disableSpacing className='bottomContent'>
                <Box> <IconButton aria-label="add"
                  onClick={handleAddToCart}
                >
                  <AddShoppingCart />
                </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.primary" sx={{ marginRight: "10px", color: "rgba(0, 0, 0, 0.54)" }}>
                  <b>
                    ${product.price}
                  </b>
                </Typography>
              </CardActions>
            </Card>
          ))
        }
      </Box>
    </Box>
  );
}
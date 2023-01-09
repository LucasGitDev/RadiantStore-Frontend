import { Box, Button, Divider, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomLayout from '../../components/CustomLayout';
import SkinCard from '../../components/SkinCard';
import { OrderService } from '../../services/order/OrderService';

export default function Cart() {
  const [cart, setCart] = useState([]);

  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    OrderService.getCart().then((res) => {
      if (res instanceof Error) {
        console.log('caiu no erro');
        alert(res.message);
      } else {
        console.log('opa');
        setCart(res);
      }
    });
  }, []);

  const handleCreateOrder = () => {
    OrderService.createOrder().then((res) => {
      if (res instanceof Error) {
        alert(res.message);
      } else {
        alert('Pedido criado com sucesso!');
        window.location.reload();
      } 
    });
  };

  return (
    <>
      <CustomLayout title="Carrinho">
        <Box display="flex" justifyContent="start" alignItems="center" flexDirection="column">
          <Box component="div" height="90vh" width="100%">
            <Box
              width={mdDown ? '80%' : !lgDown ? '85%' : '100%'}
              display="flex"
              flex={1}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              m={smDown ? 'initial' : lgDown ? 'auto' : 'initial'}
            >
              <Grid
                spacing={2}
                flex={1}
                container
                width="100%"
                pl={lgDown ? 2 : 5}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {cart?.length !== 0 ? (
                  cart?.map((skin, index) => (
                    <Grid item xs={8} sm={6} md={4} lg={4} xl={3} key={index}>
                      <SkinCard skin={skin} renderButton={false} />
                    </Grid>
                  ))
                ) : (
                  <>
                    <Box mt={20} height="60vh">
                      <Typography variant="h4" color="#fff">
                        Carrinho vazio :/
                      </Typography>
                    </Box>
                  </>
                )}
              </Grid>
            </Box>
            <Divider light />
            <Box display="flex" justifyContent="start" alignItems="center" flexDirection="column">
              <Button
                onClick={handleCreateOrder}
                variant="contained"
                color="primary"
                style={{ borderRadius: 15, height: 50 }}
              >
                Finalizar pedido
              </Button>
            </Box>
            <Divider light />
            <Box mb={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <footer>
                <span>&copy; Copyright 2023, Lucas Teles. All Rights Reserved</span>
              </footer>
            </Box>
          </Box>
        </Box>
      </CustomLayout>
    </>
  );
}

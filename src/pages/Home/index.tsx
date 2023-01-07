import { Divider, Grid, Paper, TextField, Theme, Typography, useMediaQuery } from '@mui/material';
import CustomLayout from '../../components/CustomLayout';
import { Box } from '@mui/system';
import './Home.css';

const Home = () => {
  const xlDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <>
      <CustomLayout title="Home">
        <Box component="div" overflow="scroll" height="90vh" width="100%">
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
              {Array.from(Array(13)).map((_, index) => (
                <Grid item xs={8} sm={6} md={4} lg={4} xl={3} key={index}>
                  <Paper
                    sx={{
                      mb: 2,
                      height: '50vh',
                      width: '35vh',
                      backgroundColor: '#1A2027',
                      borderRadius: '20px',
                    }}
                  ></Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Divider light />
          <Box mb={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <footer>
              <span>&copy; Copyright 2022, Lucas Teles. All Rights Reserved</span>
            </footer>
          </Box>
        </Box>
      </CustomLayout>
    </>
  );
};

export default Home;

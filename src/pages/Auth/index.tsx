import './Auth.css';
import { Box, Button, createTheme, TextField, ThemeProvider, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from 'react-router-dom';
import BackgroundVideo from '../../components/BackgroundVideo';
import logo from '../../assets/logo.svg';
import { TextFieldTheme } from '../../themes/TextFieldTheme';

function Auth() {
  const location = useLocation();
  return (
    <>
      <BackgroundVideo>
        <Link to="/">
          <img src={logo} alt="logo" className="logo" width={100} />
        </Link>
        <Typography className="title-name" fontFamily="VALORANT" variant="h3" noWrap>
          Radiant Store
        </Typography>
        <ThemeProvider theme={TextFieldTheme}>
          {location.pathname === '/auth/login' ? (
            <Box component="form">
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField fullWidth label="Email" variant="outlined" sx={{ input: { color: 'white' } }} />
              </Box>
              <Box marginBottom={2}>
                <TextField fullWidth label="Password" variant="outlined" sx={{ input: { color: 'white' } }} />
              </Box>
            </Box>
          ) : (
            <Box component="form">
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField fullWidth label="Nome" variant="outlined" sx={{ input: { color: 'white' } }} />
              </Box>
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField fullWidth label="Sobrenome" variant="outlined" sx={{ input: { color: 'white' } }} />
              </Box>
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField fullWidth label="Email" variant="outlined" sx={{ input: { color: 'white' } }} />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  type="password"
                  fullWidth
                  label="Senha"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                />
              </Box>
            </Box>
          )}
        </ThemeProvider>
        <Button
          component={Link}
          to={location.pathname === '/auth/login' ? '/home' : '/auth/login'}
          variant="contained"
          color="primary"
          style={{ borderRadius: 15, height: 50 }}
        >
          <ArrowForwardIcon />
        </Button>
        <div style={{ marginTop: 50 }}>
          {location.pathname === '/auth/login' ? (
            <>
              <Typography className="text" variant="body1" noWrap>
                Não tem uma conta?
              </Typography>
              <Button component={Link} to="/auth/register" className="text" variant="text" color="primary">
                Cadastre-se
              </Button>
            </>
          ) : (
            <div>
              <Typography className="text" variant="body1" noWrap>
                Já tem uma conta?
              </Typography>
              <Button
                component={Link}
                to="/auth/login"
                className="text"
                variant="text"
                color="primary"
                style={{ left: 10 }}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </BackgroundVideo>
    </>
  );
}

export default Auth;

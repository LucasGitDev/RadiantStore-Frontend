import './Auth.css';
import { Alert, Box, Button, createTheme, InputAdornment, TextField, ThemeProvider, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useLocation } from 'react-router-dom';
import BackgroundVideo from '../../components/BackgroundVideo';
import logo from '../../assets/logo.svg';
import { TextFieldTheme } from '../../themes/TextFieldTheme';
import { AuthService } from '../../services/auth/AuthService';
import * as Yup from 'yup';
import { useState } from 'react';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Formato de email inválido')
    .max(100, 'Máximo de 100 caracteres no email')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres na senha')
    .max(100, 'Máximo de 100 caracteres na senha')
    .required('A senha é obrigatória'),
});

const registerSchema = Yup.object().shape({
  firstName: Yup.string().max(100, 'Máximo de 100 caracteres no nome').required('O nome é obrigatório'),
  lastName: Yup.string().max(100, 'Máximo de 100 caracteres no sobrenome').required('O sobrenome é obrigatório'),
  email: Yup.string()
    .email('Formato de email inválido')
    .max(100, 'Máximo de 100 caracteres no email')
    .required('O email é obrigatório'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres na senha')
    .max(100, 'Máximo de 100 caracteres na senha')
    .required('A senha é obrigatória'),
});

function Auth() {
  const location = useLocation();
  const [error, setError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [register, setRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleLogin = () => {
    loginSchema
      .validate(login)
      .then((value) => {
        setError('');
        AuthService.login(value.email, value.password).then((response) => {
          if (!response) {
            window.location.href = '/';
          }
          setError(response || '');
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleRegister = () => {
    registerSchema
      .validate(register)
      .then((value) => {
        AuthService.register(value).then((response) => {
          if (!response) {
            window.location.href = '/auth/login';
          }
          setError(response || '');
        });
        setError('');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

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
                <TextField
                  value={login.email}
                  onChange={(e) => setLogin({ ...login, email: e.target.value })}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                />
              </Box>
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField
                  value={login.password}
                  onChange={(e) => setLogin({ ...login, password: e.target.value })}
                  fullWidth
                  label="Password"
                  type={hidePassword ? 'password' : 'text'}
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                  style={{ width: '40vh' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setHidePassword(!hidePassword)}>
                          {hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          ) : (
            <Box component="form">
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField
                  value={register.firstName}
                  onChange={(e) => setRegister({ ...register, firstName: e.target.value })}
                  fullWidth
                  label="Nome"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                />
              </Box>
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField
                  value={register.lastName}
                  onChange={(e) => setRegister({ ...register, lastName: e.target.value })}
                  fullWidth
                  label="Sobrenome"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                />
              </Box>
              <Box marginBottom={2} style={{ width: '40vh' }}>
                <TextField
                  value={register.email}
                  onChange={(e) => setRegister({ ...register, email: e.target.value })}
                  fullWidth
                  label="Email"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                />
              </Box>
              <Box marginBottom={2}>
                <TextField
                  value={register.password}
                  onChange={(e) => setRegister({ ...register, password: e.target.value })}
                  fullWidth
                  type={hidePassword ? 'password' : 'text'}
                  label="Senha"
                  variant="outlined"
                  sx={{ input: { color: 'white' } }}
                  style={{ width: '40vh' }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setHidePassword(!hidePassword)}>
                          {hidePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}
        </ThemeProvider>
        {error !== '' ? (
          <Box my={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          style={{ borderRadius: 15, height: 50 }}
          onClick={location.pathname === '/auth/login' ? handleLogin : handleRegister}
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

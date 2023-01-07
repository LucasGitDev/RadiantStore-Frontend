import { createTheme } from '@mui/material';

export const TextFieldTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
      dark: '#fff',
    },
  },
  typography: {
    fontFamily: 'Tungsten-Bold',
    fontSize: 20,
    allVariants: {
      color: '#fff',
      borderColor: '#fff',
    },
  },
});
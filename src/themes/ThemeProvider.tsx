import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        primary: {
          main: '#ff4655',
          dark: '#0f1923',
          contrastText: '#fff',
        },
        secondary: {
          main: '#0f1923',
          dark: '#0f1923',
          contrastText: '#fff',
        },
        background: {
          default: '#303134', //175a62
          paper: '#202124',
        },
      },
      typography: {
        fontFamily: 'Tungsten-Bold',
        button: {
          fontSize: '1.3rem',
        },
        h2: {
          color: '#DBAB0D',
          fontSize: 50,
        },
        subtitle1: {
          color: '#fff',
        },
      },
    }),
  );

  theme.typography.h3 = {
    fontSize: '2.7rem',
    color: '#DBAB0D',
    '@media (min-width:600px)': {
      fontSize: '3.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5.4rem',
    },
  };

  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}

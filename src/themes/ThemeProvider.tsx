import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export function AppThemeProvider({ children }: { children: React.ReactNode}) {
  const mode = 'dark';
  const theme = responsiveFontSizes(
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#DD3333',
        },
        secondary: {
          main: '#222489',
        },
        background: {
          default: mode === 'dark' ? '#1F1F1F' : '#FCFBFA',
          paper: mode === 'dark' ? '#131313' : '#fcfcfc',
        },
        grey: {
          50: mode === 'dark' ? 'hsl(0, 0%, 9%)' : 'hsl(0, 10%, 97%)',
          100: mode === 'dark' ? 'hsl(0, 0%, 15%)' : 'hsl(0, 0%, 92%)',
          200: mode === 'dark' ? 'hsl(0, 0%, 25%)' : 'hsl(0, 0%, 83%)',
          300: mode === 'dark' ? 'hsl(0, 0%, 35%)' : 'hsl(0, 0%, 80%)',
          400: mode === 'dark' ? 'hsl(0, 0%, 50%)' : 'hsl(0, 0%, 70%)',
          500: mode === 'dark' ? 'hsl(0, 0%, 70%)' : 'hsl(0, 0%, 50%)',
          600: mode === 'dark' ? 'hsl(0, 0%, 80%)' : 'hsl(0, 0%, 35%)',
          700: mode === 'dark' ? 'hsl(0, 0%, 83%)' : 'hsl(0, 0%, 25%)',
          800: mode === 'dark' ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 15%)',
          900: mode === 'dark' ? 'hsl(0, 10%, 97%)' : 'hsl(0, 0%, 9%)',
        },
      },

      typography: {
        fontFamily: 'Tungsten-bold, sans-serif',
        body1: {
          lineHeight: '20px',
        },
        body2: {
          lineHeight: '18px',
        },
      },
      components: {
        MuiLink: {
          styleOverrides: {
            root: {
              cursor: 'pointer',
              textDecoration: 'none',
              lineHeight: '16px',
              transition: 'all 0.1s ease-in-out',
              '&:hover': {
                opacity: 0.8,
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              aspectRatio: '1/1',
            },
          },
        },
      },
    }),
  );

  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}

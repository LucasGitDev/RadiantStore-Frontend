import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import './CustomLayout.css';
import logo from '../../assets/logo.svg';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { Link } from 'react-router-dom';

interface ICustomLayoutProps {
  children: any;
  title: string;
}

export default function CustomLayout({ children, title }: ICustomLayoutProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const theme = useTheme();

  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <div className="custom-layout">
      <Box height="100%" display="flex" flexDirection="column" gap={1}>
        <Box padding={1} display="flex" alignItems="center" height={theme.spacing(12)} gap={1}>
          {smDown && (
            <IconButton onClick={toggleDrawerOpen}>
              <Icon>menu</Icon>
            </IconButton>
          )}

          <Box display="flex" gap={1} margin="auto">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" width={25} />
            </Link>

            <Typography
              fontFamily="VALORANT"
              color="#DBAB0D"
              variant="h5"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {title}
            </Typography>
          </Box>
        </Box>

        <Box flex={1} overflow="auto" >
          {children}
        </Box>
      </Box>
    </div>
  );
}

import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../../contexts/DrawerContext';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemDrawerProps {
  to: string;
  icon: string;
  text: string;
  onClick: (() => void) | undefined;
}

const ListItemDrawer = ({ to, icon, text, onClick }: IListItemDrawerProps) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon color="primary">{icon}</Icon>
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1" color="#fff">
          {text}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};
export default function CustomDrawer({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();
  return (
    <>
      <Drawer open={isDrawerOpen} variant={lgDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Avatar sx={{ height: theme.spacing(6), width: theme.spacing(6) }} />
            <Typography variant="h6" color="#fff" textAlign="center">
              User Name
            </Typography>
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((item, i) => {
                return (
                  <ListItemDrawer
                    key={i}
                    to={item.path}
                    icon={item.icon}
                    text={item.label}
                    onClick={toggleDrawerOpen}
                  />
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height="100vh" marginLeft={lgDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
}

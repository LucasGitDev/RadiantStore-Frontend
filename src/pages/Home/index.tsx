import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CustomLayout from '../../components/CustomLayout';
import { Box } from '@mui/system';
import './Home.css';
import SkinCard from '../../components/SkinCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { SkinService } from '../../services/skin/SkinService';

const orderOptions = [
  { value: 'name', label: 'Nome' },
  { value: 'price', label: 'Preço' },
  { value: 'rarity', label: 'Raridade' },
  { value: 'gun', label: 'Arma' },
];

const Home = () => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const [order, setOrder] = useState('');
  const [ascending, setAscending] = useState(true);
  const [search, setSearch] = useState('');
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    SkinService.getSkinList({}).then((response) => {
      setSkins(response.data);
    });
  }, []);

  const handleChangeOrder = (event: SelectChangeEvent) => {
    setOrder(event.target.value as string);
  };

  const handleChangeAscending = (event: ChangeEvent<HTMLInputElement>) => {
    setAscending(event.target.checked);
  };

  const handleSearch = () => {
    const params = {
      order: order ? `${order} ${ascending ? 'asc' : 'desc'}` : undefined,
      name: search,
    };
    SkinService.getSkinList(params).then((response) => {
      console.log(response.data);
      setSkins(response.data);
    });
  };

  return (
    <>
      <CustomLayout title="Home">
        <Box
          sx={{ zIndex: 1 }}
          mt={1}
          mb={1}
          gap={2}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <FormControlLabel
            color="white"
            control={<Switch defaultChecked value={ascending} onChange={handleChangeAscending} />}
            label={ascending ? 'Crescente' : 'Decrescente'}
            value="start"
            labelPlacement="start"
            sx={{ color: 'white' }}
          />
          <FormControl sx={{ width: '15vh' }}>
            <InputLabel style={{ color: '#fff' }}>Ordenar por</InputLabel>
            <Select value={order} onChange={handleChangeOrder} style={{ color: '#fff' }}>
              {orderOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
            variant="outlined"
            InputLabelProps={{
              style: { color: '#fff' },
            }}
            style={{ color: '#fff' }}
          />
          <Button onClick={handleSearch} variant="contained" color="primary" style={{ borderRadius: 15, height: 50 }}>
            <Icon>search</Icon>
          </Button>
        </Box>
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
              {skins?.length !== 0 ? (
                skins?.map((skin, index) => (
                  <Grid item xs={8} sm={6} md={4} lg={4} xl={3} key={index}>
                    <SkinCard skin={skin} renderButton />
                  </Grid>
                ))
              ) : (
                <>
                  <Box mt={20} height="60vh">
                    <Typography variant="h4" color="#fff">
                      Nenhuma skin encontrada :/
                    </Typography>
                  </Box>
                </>
              )}
            </Grid>
          </Box>
          <Divider light />
          <Box mb={5} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <footer>
              <span>&copy; Copyright 2023, Lucas Teles. All Rights Reserved</span>
            </footer>
          </Box>
        </Box>
      </CustomLayout>
    </>
  );
};

export default Home;

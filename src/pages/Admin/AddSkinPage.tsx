import {
  Autocomplete,
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import CustomLayout from '../../components/CustomLayout';
import { TextFieldTheme } from '../../themes/TextFieldTheme';

export default function AddSkinPage() {
  const theme = useTheme();

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <CustomLayout title="Nova Skin">
        <Box component="div" width="100%">
          <Paper
            sx={{
              height: 'auto',
              width: '50vh',
              margin: 'auto',
              borderRadius: '20px',
              padding: '2rem',
            }}
          >
            <Box mt={3} gap={1} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
              <Box component="form">
                <Box marginBottom={2} style={{ width: '40vh' }}>
                  <TextField
                    fullWidth
                    label="Nome da Skin"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                  />
                </Box>
                <Box marginBottom={2} style={{ width: '40vh' }}>
                  <Autocomplete
                    disablePortal
                    style={{ color: '#fff' }}
                    options={['AK-47', 'M4A1', 'AWP', 'P90', 'UMP-45', 'Glock-18', 'USP-S', 'Desert Eagle', 'P2000']}
                    sx={{ width: '40vh', fontFamily: 'Tungsten-Bold', fontSize: 20, borderColor: 'white' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Arma"
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: '#fff' },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box marginBottom={2} style={{ width: '40vh' }}>
                  <Autocomplete
                    disablePortal
                    options={[
                      'Deluxe Edition',
                      'Exclusive Edition',
                      'Premium Edition',
                      'Select Edition',
                      'Ultra Edition',
                    ]}
                    sx={{ width: '40vh', fontFamily: 'Tungsten-Bold', fontSize: 20, borderColor: 'white' }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        label="Raridade"
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: '#fff' },
                        }}
                      />
                    )}
                  />
                </Box>
                <Box marginBottom={2} style={{ width: '40vh' }}>
                  <TextField
                    fullWidth
                    label="Preço"
                    variant="outlined"
                    InputLabelProps={{
                      style: { color: '#fff' },
                    }}
                  />
                </Box>
              </Box>
              <FormControlLabel
                style={{ color: '#fff' }}
                value="start"
                control={<Switch color="primary" />}
                label="Disponível para venda?"
                labelPlacement="start"
              />
              <Button variant="contained" component="label" color="secondary" style={{ borderRadius: 15, height: 50 }}>
                Upload da Imagem
                <input type="file" accept="image/png" hidden {...register('file')} />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ borderRadius: 15, height: 50 }}
                onClick={handleSubmit(onSubmit)}
              >
                Criar Skin
              </Button>
            </Box>
          </Paper>
        </Box>
      </CustomLayout>
    </>
  );
}

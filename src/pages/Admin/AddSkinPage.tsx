import { Alert, Autocomplete, Button, FormControlLabel, Paper, Switch, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import CustomLayout from '../../components/CustomLayout';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { api } from '../../services/axios/api';
import { SkinService } from '../../services/skin/SkinService';

const createSkinSchema = Yup.object().shape({
  name: Yup.string().max(100, 'Máximo de 100 caracteres no nome').required('O nome é obrigatório'),
  gun: Yup.string().max(100, 'Máximo de 100 caracteres na arma').required('A arma é obrigatória'),
  rarity: Yup.string().max(100, 'Máximo de 100 caracteres na raridade').required('A raridade é obrigatória'),
  available: Yup.boolean().required('A disponibilidade é obrigatória'),
  price: Yup.number()
    .nullable()
    .when('rarity', {
      is: (rarity: string) => rarity === 'Exclusive Edition',
      then: Yup.number().required('O preço é obrigatório'),
    }),
});

const guns = [
  'Classic',
  'Shorty',
  'Frenzy',
  'Ghost',
  'Sheriff',
  'Stinger',
  'Spectre',
  'Bulldog',
  'Bucky',
  'Judge',
  'Guardian',
  'Phantom',
  'Vandal',
  'Marshal',
  'Operator',
  'Ares',
  'Odin',
  'Knife',
];

const rarities = ['Deluxe Edition', 'Exclusive Edition', 'Premium Edition', 'Select Edition', 'Ultra Edition'];

export default function AddSkinPage() {
  const [createSkin, setCreateSkin] = useState<{
    name: string;
    gun: string;
    rarity: string;
    available: boolean;
    price: number | undefined | null;
  }>({
    name: '',
    gun: '',
    rarity: '',
    available: false,
    price: null,
  });

  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (fileData: any) => {
    if (fileData?.file[0]?.type !== 'image/png') {
      setError('A imagem deve ser PNG');
      return;
    }

    await delay(550);

    createSkinSchema
      .validate(createSkin)
      .then(async (values) => {
        setError(null);
        const formData = new FormData();
        formData.append('file', fileData.file[0]);
        console.log(fileData);

        const { data } = await api.post('/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const created = await SkinService.createSkin({ ...values, image: data.id });
        if (created) {
          window.location.href = '/';
        }
      })
      .catch((err) => {
        setError(err.message);
        if (err.message.includes('price')) {
          setError('O preço é obrigatório');
          return;
        }
      });
  };

  const delay = (mili: number) => {
    return new Promise((resolve) => setTimeout(resolve, mili));
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
                    value={createSkin.name}
                    onChange={(e) => setCreateSkin({ ...createSkin, name: e.target.value })}
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
                    onChange={(_, value) => setCreateSkin({ ...createSkin, gun: value as string })}
                    disablePortal
                    style={{ color: '#fff' }}
                    options={guns}
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
                    onChange={(_, value) => {
                      console.log(`new value ${value}`)
                      setCreateSkin({ ...createSkin, rarity: value as string });
                      if (value !== 'Exclusive Edition' && value !== undefined && value !== '') {
                        setTimeout(() => {
                          setCreateSkin({ ...createSkin, price: undefined, rarity: value as string });
                        }, 500);
                      }
                    }}
                    disablePortal
                    options={rarities}
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
                {createSkin?.rarity === 'Exclusive Edition' ? (
                  <Box marginBottom={2} style={{ width: '40vh' }}>
                    <TextField
                      value={createSkin.price}
                      onChange={(e) => setCreateSkin({ ...createSkin, price: Number(e.target.value) })}
                      fullWidth
                      label="Preço"
                      variant="outlined"
                    />
                  </Box>
                ) : null}
              </Box>
              {error ? <Alert severity="error">{error}</Alert> : null}
              <FormControlLabel
                style={{ color: '#fff' }}
                value="start"
                control={
                  <Switch
                    value={createSkin.available}
                    onChange={(e) => setCreateSkin({ ...createSkin, available: e.target.checked })}
                    color="primary"
                  />
                }
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

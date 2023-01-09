import { Button, Card, CardActions, CardContent, CardMedia, Grid, Icon, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import './SkinCard.css';
import deluxe from '../../assets/deluxe.png';
import exclusive from '../../assets/exclusive.png';
import premium from '../../assets/premium.png';
import select from '../../assets/select.png';
import ultra from '../../assets/ultra.png';
import { getAuthToken, isAdmin } from '../../utils/auth';
import { SkinService } from '../../services/skin/SkinService';
import { OrderService } from '../../services/order/OrderService';

interface ISkinCardProps {
  skin: {
    id: string;
    name: string;
    gun: string;
    rarity: string;
    price: number;
    available: boolean;
    image: {
      id: string;
      path: string;
    } | null;
  };
}

function choseRarity(rarity: string) {
  switch (rarity) {
    case 'Deluxe Edition':
      return deluxe;
    case 'Exclusive Edition':
      return exclusive;
    case 'Premium Edition':
      return premium;
    case 'Select Edition':
      return select;
    case 'Ultra Edition':
      return ultra;
    default:
      return select;
  }
}

export default function SkinCard({ skin }: ISkinCardProps) {
  const handleDelete = () => {
    SkinService.deleteSkin(skin.id).then(() => {
      window.location.reload();
    });
  };

  const handleAddSkinToCart = () => {
    if (getAuthToken()) {
      OrderService.addSkinToCart(skin.id).then((res) => {
        if (res instanceof Error) {
          alert(res.message);
        } else {
          alert('Skin adicionada ao carrinho com sucesso!');
        }
      });
    } else {
      alert('Você precisa estar logado para adicionar uma skin ao carrinho!');
    }
  };

  return (
    <Paper
      sx={{
        mb: 2,
        height: '50vh',
        width: '35vh',
        borderRadius: '20px',
      }}
    >
      <Card sx={{ width: '35vh', height: '50vh', borderRadius: '20px' }}>
        <Box mt={3} height="35%" display="flex" justifyContent="center">
          <img
            src={skin.image?.path}
            style={{ margin: 'auto', display: 'block', objectFit: 'contain', width: '70%  ' }}
          />
        </Box>
        <Box mt={3} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <CardContent>
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
              <Typography gutterBottom variant="subtitle1">
                {skin.price} VP {skin.available ? '| Disponível |' : '| Indisponível  |'}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                {skin.name}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            {isAdmin() ? (
              <Button
                onClick={handleDelete}
                variant="contained"
                color="primary"
                style={{ borderRadius: 15, height: 50 }}
              >
                <Icon>delete</Icon>
              </Button>
            ) : (
              <Button
                onClick={handleAddSkinToCart}
                variant="contained"
                color="primary"
                style={{ borderRadius: 15, height: 50 }}
              >
                <Icon>add_shopping_cart</Icon>
              </Button>
            )}
          </CardActions>
          <Box display="flex" justifyContent="end" mr={2}>
            <img src={choseRarity(skin.rarity)} style={{ width: '10%' }} />
          </Box>
        </Box>
      </Card>
    </Paper>
  );
}

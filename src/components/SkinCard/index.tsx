import { Grid, Paper } from '@mui/material';
import './SkinCard.css';

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

export default function SkinCard({skin}: ISkinCardProps) {
  return (
    <Paper
      className="skin-card-paper"
      sx={{
        mb: 2,
        height: '50vh',
        width: '35vh',
        borderRadius: '20px',
      }}
    ></Paper>
  );
}

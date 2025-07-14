import { Box, Button, IconButton, useTheme } from '@mui/material';
import { ArrowBack, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import FavoriteMovieStore from '../../../store/FavoriteMovieStore';
import { observer } from 'mobx-react-lite';
import ModalWindow from '../../ModalWindow/ModalWindow';

interface MovieHeaderProps {
  movie: {
    id: number;
    name?: string;
    alternativeName?: string;
    year?: number;
  };
}

export const MovieHeader = observer(({ movie }: MovieHeaderProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/')}
        startIcon={<ArrowBack />}
        sx={{
          textTransform: 'none',
          borderRadius: '20px',
          px: 3,
        }}
      >
        Назад
      </Button>
 <ModalWindow />
      <IconButton
        sx={{
          color: FavoriteMovieStore.checkIsMovieInFavorites(movie.id)
            ? theme.palette.error.main
            : theme.palette.text.secondary,
          '&:hover': {
            color: theme.palette.error.main,
          },
        }}
      >
        {FavoriteMovieStore.checkIsMovieInFavorites(movie.id) ? (
          <Favorite />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>
    </Box>
  );
});

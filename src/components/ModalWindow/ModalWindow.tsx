import { observer } from 'mobx-react-lite';

import FavoriteMovieStore from '../../store/FavoriteMovieStore';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import MoviesStore from '../../store/MoviesStore';
import { useNavigate } from 'react-router';
import UserStore from '../../store/UserStore';

const ModalWindow = observer(() => {
  const [open, setOpen] = useState(false);
  const movie = MoviesStore.currentMovie;
  const user = UserStore.currentUser;
  const navigate = useNavigate();
  const handleClickOpen = () => {
    if (!user) {
      navigate('/');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (movie) {
      favoriteMovieStore.addFavoriteMovie(movie);
    }
    setOpen(false);
  };
  const favoriteMovieStore = FavoriteMovieStore;
  const isFavorite = movie
    ? favoriteMovieStore.checkIsMovieInFavorites(movie.id)
    : false;

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        disabled={isFavorite}
      >
        <Typography>
          {isFavorite ? 'Уже в избранном' : 'Добавить в избранное'}
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить в избранное</DialogTitle>
        <DialogContent>
          <DialogContentText component={'div'}>
            <Box
              sx={{
                display: 'flex',

                flexDirection: 'column',
              }}
            >
              <Typography>Вы действительно хотите добавить фильм: </Typography>
              <Typography color="success">
                {' '}
                {MoviesStore.currentMovie?.name ||
                  MoviesStore.currentMovie?.alternativeName}{' '}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default ModalWindow;

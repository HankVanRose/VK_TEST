import { observer } from 'mobx-react-lite';

import FavoriteMovieStore from '../../store/FavoriteMovieStore';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import MoviesStore from '../../store/MoviesStore';
 
import UserStore from '../../store/UserStore';

const ModalWindow = observer(() => {
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSuccessSnack, setOpenSuccessSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const movie = MoviesStore.currentMovie;
  const user = UserStore.currentUser;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenSnack = () => {
    setSnackMessage('Необходимо зарегистрироваться');
    setOpenSnack(true);
  };

  const handleCloseSnack = () => {
    setOpenSnack(false);
  };

  const handleCloseSuccessSnack = () => {
    setOpenSuccessSnack(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (movie) {
      favoriteMovieStore.addFavoriteMovie(movie);
      setSnackMessage(
        `Фильм "${movie.name || movie.alternativeName}" добавлен в избранное!`
      );
      setOpenSuccessSnack(true);
    }
    setOpen(false);
  };
  const favoriteMovieStore = FavoriteMovieStore;
  const isFavorite = movie
    ? favoriteMovieStore.checkIsMovieInFavorites(movie.id)
    : false;

  return (
    <>
      {user ? (
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          disabled={isFavorite}
        >
          <Typography>
            {isFavorite ? 'Уже в избранном' : 'Добавить в избранное'}
          </Typography>
        </Button>
      ) : (
        <>
          <Tooltip title="Необходимо зарегистрироваться" arrow>
            <Button variant="outlined" onClick={handleClickOpenSnack}>
              <Typography>ДОБАВИТЬ В ИЗБРАННОЕ</Typography>
            </Button>
          </Tooltip>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleCloseSnack}
          >
            <Alert
              onClose={handleCloseSnack}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackMessage}
            </Alert>
          </Snackbar>
        </>
      )}

      <Snackbar
        open={openSuccessSnack}
        autoHideDuration={6000}
        onClose={handleCloseSuccessSnack}
      >
        <Alert
          onClose={handleCloseSuccessSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>

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

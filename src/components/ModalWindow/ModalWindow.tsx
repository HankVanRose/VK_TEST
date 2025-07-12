import { observer } from 'mobx-react-lite';
import React from 'react';
import FavoriteMovieStore from '../../store/FavoriteMovieStore';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const ModalWindow = observer(() => {
  const favoritesStore = FavoriteMovieStore;
  return (
    <Dialog
      open={favoritesStore.isDialogOpen}
      onClose={favoritesStore.closeDialog}
    >
      <DialogTitle>Добавить в избранное</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы действительно хотите добавить фильм "
          {favoritesStore.selectedMovie?.name}" в избранное?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={favoritesStore.closeDialog}>Отмена</Button>
        <Button
          onClick={favoritesStore.addToFavorites}
          color="primary"
          autoFocus
        >
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default ModalWindow;

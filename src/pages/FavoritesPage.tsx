import React from 'react';
import { observer } from 'mobx-react-lite';

import { Grid, Box, Typography } from '@mui/material';
import MovieCard from '../components/MovieCard/MovieCard';
import FavoriteMovieStore from '../store/FavoriteMovieStore';

const FavoritesPage: React.FC = observer(() => {
  const favorites = FavoriteMovieStore.favorites;
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Избранные фильмы
      </Typography>
      {favorites.length === 0 ? (
        <Typography>У вас пока нет избранных фильмов</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((movie) => (
            <Grid key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
});

export default FavoritesPage;

 import React from 'react';
import { observer } from 'mobx-react-lite';

import MovieCard from '../MovieCard/MovieCard';
import { Box } from '@mui/material';
import MoviesStore from '../../store/MoviesStore';

const MovieList: React.FC = observer(() => {
  return (
    <Box
      sx={{
        minWidth: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        justifyContent: 'center',
        justifyItems: 'center',
        gap: '10px 50px',
        mt: 2.5,
      }}
    >
      {MoviesStore.filteredMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
});

export default MovieList;
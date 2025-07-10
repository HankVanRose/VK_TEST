import MovieCard from '../MovieCard/MovieCard';

import type { Movies } from '../../api/types/movie';
import { Box } from '@mui/material';

interface MovieListProps {
  movies: Movies;
}

export default function MovieList({ movies }: MovieListProps) {
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
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Box>
  );
}

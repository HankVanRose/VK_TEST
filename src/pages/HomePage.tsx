import { useEffect } from 'react';
import MovieList from '../components/MovieList/MovieList';

import { Box } from '@mui/material';
import MoviesStore from '../store/MovieStore';
import { observer } from 'mobx-react-lite';

const HomePage = observer(() => {
  useEffect(() => {
    MoviesStore.reset();
    MoviesStore.loadMovies();
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition >= pageHeight - 100 &&
        !MoviesStore.isLoading &&
        MoviesStore.moreToLoad
      ) {
        MoviesStore.loadMovies();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    
    };
  }, []);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <MovieList movies={MoviesStore?.movies} />
    </Box>
  );
});
export default HomePage;

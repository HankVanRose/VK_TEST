import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router';
import MoviesStore from '../store/MoviesStore';
import Filters from '../components/Filters/Filters';
import MovieList from '../components/MovieList/MovieList';
import ScrollTopButton from '../components/ScrollTopButton';

const HomePage = observer(() => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    MoviesStore.reset();
    MoviesStore.loadInitialMovies(searchParams);
    
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;

      if (
        scrollPosition >= pageHeight - 300 &&
        !MoviesStore.isLoading &&
        MoviesStore.moreToLoad
      ) {
        MoviesStore.loadMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchParams]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Filters />
      <MovieList />
      <ScrollTopButton />
    </Box>
  );
});

export default HomePage;
// import { useEffect } from 'react';
// import MovieList from '../components/MovieList/MovieList';

// import { Box } from '@mui/material';
// import MoviesStore from '../store/MoviesStore';
// import { observer } from 'mobx-react-lite';

// import Filters from '../components/Filters/Filters';

// const HomePage = observer(() => {
//   useEffect(() => {
//     MoviesStore.reset();
//     MoviesStore.loadMovies();
//     const handleScroll = () => {
//       const scrollPosition = window.innerHeight + window.scrollY;
//       const pageHeight = document.documentElement.scrollHeight;

//       if (
//         scrollPosition >= pageHeight - 300 &&
//         !MoviesStore.isLoading &&
//         MoviesStore.moreToLoad
//       ) {
//         MoviesStore.loadMovies();
//       }
//     };
//     const checkLoad = () => {
//       if (MoviesStore.movies.length === 0 && !MoviesStore.isLoading) {
//         MoviesStore.loadMovies();
//       }
//     };
//     const timer = setInterval(checkLoad, 300);
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       clearInterval(timer);
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         textAlign: 'center',
//       }}
//     >
//       <Filters />
//       <MovieList movies={MoviesStore?.movies} />
//     </Box>
//   );
// });
// export default HomePage;

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
import MoviesStore from '../store/MoviesStore';
import Filters from '../components/Filters/Filters';
import MovieList from '../components/MovieList/MovieList';

const HomePage = observer(() => {
  useEffect(() => {
    MoviesStore.reset();
    MoviesStore.loadMovies();

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
      <Filters />
      <MovieList />
    </Box>
  );
});

export default HomePage;

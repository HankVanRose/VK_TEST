import { useEffect, useState, useCallback } from 'react';
import MovieList from '../components/MovieList/MovieList';
import axios from 'axios';
import type { Movie } from '../api/types/movie';
import Loading from './Loading';
import { Box, Typography } from '@mui/material';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const chunk = 50;

  const fetchMovies = useCallback(async () => {
    if (!isMore || loading) return;

    setLoading(true);
    try {
      const response = await axios.get(`../.././data.json`, {
        params: {
          limit: chunk,
          page: page,
        },
        // headers: { 'X-API-KEY': '0Q324AJ-BK6MGPA-HC7S89E-M504R5T' },
      });

      const { docs } = response.data;
      setMovies((prev) => [...prev, ...docs]);
      setPage((prev) => prev + 1);
      setIsMore(docs.length === chunk);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, isMore, loading]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        loading
      ) {
        return;
      }
      fetchMovies();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMovies, loading]);

  return (
    <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', textAlign:'center'}}>
      <MovieList movies={movies} />
      {loading && <Loading />}
      {!isMore && <Typography  marginTop='20px' variant="body1" fontWeight="medium">Все фильмы загружены</Typography>}
    </Box>
  );
}

import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import MoviesStore from '../store/MoviesStore.ts';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ImageList,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Loading from './Loading.tsx';
import { toJS } from 'mobx';
import { SiKinopoisk } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';

export default function MoviePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const movieId = Number(id);
        if (isNaN(movieId)) {
          throw new Error('Invalid movie ID');
        }
        await MoviesStore.loadMovieDetails(movieId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load movie');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const movie = MoviesStore?.currentMovie;
  console.log(toJS(movie));

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Typography>Movie not found</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mb: 3 }}>
        Назад
      </Button>

      <Typography variant="h3">
        {movie?.name} {movie?.year}
      </Typography>
      <Typography variant="h6" color="textSecondary">
        {movie?.alternativeName}
      </Typography>

      <Box
        display="flex"
        gap={4}
        flexDirection={{ xs: 'column', md: 'row' }}
        mb={4}
      >
        <Box flex={1} sx={{ maxWidth: { md: 400 } }}>
          <img
            src={movie?.poster?.url}
            alt={movie?.poster?.previewUrl}
            style={{
              width: '100%',
              borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          />
        </Box>

        <Box flex={2}>
          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label={
                movie.ageRating === null
                  ? 'Нет возрастного рейтинга'
                  : movie.ageRating + '+'
              }
              color="primary"
              size="small"
            />
            {movie.genres?.map((genre) => (
              <Chip
                key={genre?.name}
                label={genre?.name}
                variant="outlined"
                size="small"
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>

          <Typography variant="body1">{movie.description}</Typography>

          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <SiKinopoisk size={20} style={{ color: '#ff6600' }} />
            <Rating
              value={movie?.rating?.kp ? movie.rating.kp / 2 : 0}
              precision={0.1}
              readOnly={true}
            />
            <Typography variant="h6">
              {movie.rating?.kp?.toFixed(1)}/10
            </Typography>

            <FaImdb size={20} style={{ color: '#f5c518' }} />
            <Rating
              value={movie?.rating?.imdb ? movie.rating.imdb / 2 : 0}
              precision={0.1}
              readOnly={true}
            />
            <Typography variant="h6">
              {movie.rating?.imdb?.toFixed(1)}/10
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'nowrap',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Бюджет
              </Typography>
              <Typography variant="subtitle2">
                {movie.budget?.value
                  ? `$${movie.budget.value.toLocaleString()} ${
                      movie.budget.currency
                    }`
                  : 'Неизвестно'}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Премьера
              </Typography>

              <Typography variant="subtitle2">{movie.year}</Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Длительность
              </Typography>
              <Typography variant="subtitle2">
                {movie.movieLength ? `${movie.movieLength} мин.` : 'Неизвестно'}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Страны
              </Typography>
              <Typography variant="subtitle2">
                {movie.countries?.map((c) => c.name).join(', ') || 'Не указаны'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

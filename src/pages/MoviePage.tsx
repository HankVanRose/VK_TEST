import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Paper,
  Box,
  Divider,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import { SiKinopoisk } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';

import MoviesStore from '../store/MoviesStore';

import { MoviePoster } from '../components/CurrentMovieCard/MoviePoster/MoviePoster';
import { RatingItem } from '../components/CurrentMovieCard/RatingItems/RatingItems';
import { MovieInfoItem } from '../components/CurrentMovieCard/MovieInfoItem/MovieInfoItem';
import LoremGenerator from '../components/CurrentMovieCard/Lorem/LoremGenerator';
import Loading from './Loading';
import Page404 from './Page404';

import { ActorsList } from '../components/CurrentMovieCard/ActorsList';
import { MovieHeader } from '../components/CurrentMovieCard/MovieHeader/MovieHeader';
import { MovieTitle } from '../components/CurrentMovieCard/MovieTitle/MovieTitle';
import { MovieMetadata } from '../components/CurrentMovieCard/MovieData';

export const MoviePage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const movieId = Number(id);
        if (isNaN(movieId)) throw new Error('Невалидный ID');
        await MoviesStore.loadMovieDetails(movieId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить фильм'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadMovie, 800);
    return () => clearTimeout(timer);
  }, [id]);

  const movie = MoviesStore.currentMovie;
  const actors = MoviesStore.actors;

  const ratingKp = useMemo(
    () => movie?.rating?.kp?.toFixed(1),
    [movie?.rating?.kp]
  );
  const ratingImdb = useMemo(
    () => movie?.rating?.imdb?.toFixed(1),
    [movie?.rating?.imdb]
  );
  const countries = useMemo(
    () => movie?.countries?.map((c) => c.name).join(', '),
    [movie?.countries]
  );

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Page404 />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
        <MovieHeader movie={movie} />
        <MovieTitle
          name={movie.name}
          alternativeName={movie.alternativeName}
          year={movie.year}
        />

        <Box
          display="flex"
          gap={4}
          flexDirection={{ xs: 'column', md: 'row' }}
          mb={4}
        >
          <Box
            flex={1}
            sx={{
              maxWidth: { md: 400 },
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
            }}
          >
            <MoviePoster posterUrl={movie.poster?.previewUrl} />
          </Box>

          <Box flex={2}>
            <MovieMetadata ageRating={movie.ageRating} genres={movie.genres} />

            <Box
              display="flex"
              alignItems="center"
              gap={3}
              mb={3}
              flexWrap="wrap"
            >
              <RatingItem
                icon={<SiKinopoisk size={24} style={{ color: '#ff6600' }} />}
                value={movie.rating?.kp || 0}
                label={`${ratingKp}/10`}
              />
              <RatingItem
                icon={<FaImdb size={24} style={{ color: '#f5c518' }} />}
                value={movie.rating?.imdb || 0}
                label={`${ratingImdb}/10`}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Grid container sx={{ mb: 3, justifyContent: 'space-between' }}>
              <MovieInfoItem
                label="Сборы"
                value={
                  movie.fees?.world?.value
                    ? `${movie.fees.world.value} ${movie.fees.world.currency}`
                    : null
                }
              />
              <MovieInfoItem label="Премьера" value={movie.year} />
              <MovieInfoItem
                label="Длительность"
                value={movie.movieLength ? `${movie.movieLength} мин.` : null}
              />
              <MovieInfoItem label="Страны" value={countries} />
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Box mb={3}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                }}
              >
                Описание
              </Typography>
              <Typography
                component="div"
                sx={{
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                }}
              >
                {movie.description || <LoremGenerator />}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {actors.length > 0 && <ActorsList actors={actors} />}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
});

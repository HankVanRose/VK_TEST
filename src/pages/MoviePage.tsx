import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import MoviesStore from '../store/MoviesStore.ts';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import Loading from './Loading.tsx';
import { SiKinopoisk } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';
import LoremGenerator from '../components/CurrentMovieCard/Lorem/LoremGenerator.tsx';
import { MovieInfoItem } from '../components/CurrentMovieCard/MovieInfoItem/MovieInfoItem.tsx';
import { RatingItem } from '../components/CurrentMovieCard/RatingItems/RatingItems.tsx';
import { MoviePoster } from '../components/CurrentMovieCard/MoviePoster/MoviePoster.tsx';
import { observer } from 'mobx-react-lite';
import Page404 from './Page404.tsx';
import FavoriteMovieStore from '../store/FavoriteMovieStore.ts';

export const MoviePage = observer(() => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  const genres = useMemo(() => movie?.genres, [movie?.genres]);

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!movie) return <Page404></Page404>;

  return (
    <>
      <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
          sx={{
            textTransform: 'none',
            borderRadius: '20px',
            px: 3,
          }}
        >
          Назад
        </Button>

        <Typography variant="h3">
          {movie.name} {movie.year}
        </Typography>
        {movie.alternativeName && (
          <Typography variant="h6" color="textSecondary">
            {movie.alternativeName}
          </Typography>
        )}

        <Box
          display="flex"
          gap={4}
          flexDirection={{ xs: 'column', md: 'row' }}
          mb={4}
        >
          <Box flex={1} sx={{ maxWidth: { md: 400 } }}>
            <MoviePoster posterUrl={movie.poster?.previewUrl} />
          </Box>

          <Box flex={2}>
            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
              <Chip
                label={
                  movie.ageRating
                    ? `${movie.ageRating}+`
                    : 'Нет возрастного рейтинга'
                }
                color="primary"
                size="small"
                sx={{ cursor: 'default' }}
              />
              {genres?.map((genre) => (
                <Chip
                  key={genre.name}
                  label={genre.name}
                  variant="outlined"
                  size="small"
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mb={2}
              flexWrap="wrap"
            >
              <RatingItem
                icon={<SiKinopoisk size={20} style={{ color: '#ff6600' }} />}
                value={movie.rating?.kp || 0}
                label={`${ratingKp}/10`}
              />
              <RatingItem
                icon={<FaImdb size={20} style={{ color: '#f5c518' }} />}
                value={movie.rating?.imdb || 0}
                label={`${ratingImdb}/10`}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Grid container display={'flex'} justifyContent={'space-between'}>
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

            <Divider sx={{ my: 2 }} />

            <Box mb={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Описание:
              </Typography>
              <Typography component={'div'}>
                {movie.description || <LoremGenerator />}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {actors.length > 0 && (
              <Box>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  В ролях:
                </Typography>
                <List
                  dense
                  sx={{
                    width: '100%',
                    columnCount: { xs: 1, sm: 2, md: 3 },
                    columnGap: '18px',
                    bgcolor: 'background.paper',
                  }}
                >
                  {actors.map((person) => (
                    <ListItem key={person.id} disablePadding>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar src={person?.photo} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={person?.name}
                          secondary={person?.enName}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
        <Button onClick={() => FavoriteMovieStore.addFavoriteMovie(movie)}>
          ДОБАВИТЬ В ИЗБРАННОЕ
        </Button>
      </Box>
    </>
  );
});

export default MoviePage;

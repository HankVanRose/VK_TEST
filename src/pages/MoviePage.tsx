import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import MoviesStore from '../store/MoviesStore.ts';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import Loading from './Loading.tsx';
import { toJS } from 'mobx';
import { SiKinopoisk } from 'react-icons/si';
import { FaImdb } from 'react-icons/fa';
import { TbBinocularsFilled } from 'react-icons/tb';
import LoremGenerator from '../components/Lorem/LoremGenerator.tsx';
import PersonSkeleton from '../components/PersonSkeleton/PersonSkeleton.tsx';

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
          throw new Error('Невалидный ID');
        }
        await MoviesStore.loadMovieDetails(movieId);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Не удалось загрузить фильм'
        );
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(function () {
      loadMovie();
    }, 800);
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
          <CardMedia
            component="div"
            sx={{
              position: 'relative',
              width: '100%',
              paddingTop: '150%',
              overflow: 'hidden',
              backgroundImage: movie?.poster?.previewUrl
                ? `url(${movie.poster.previewUrl})`
                : 'linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
            }}
          >
            {!movie?.poster?.previewUrl && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <TbBinocularsFilled size={200} />
                <Typography variant="body1">Постер не найден</Typography>
              </Box>
            )}
          </CardMedia>
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
              sx={{ cursor: 'default' }}
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

          <Divider sx={{ my: 2 }} />
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
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
            }}
          >
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignContent: 'center',
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
                Сборы
              </Typography>

              <Typography variant="subtitle2">
                {movie?.fees ? movie.fees.world.value : '-'}{' '}
                {movie?.fees?.world.currency}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
                alignItems: 'flex-start',
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
          <Divider sx={{ my: 2 }} />
          <Box>
            <Typography variant="body2" color="textSecondary">
              Описание:
            </Typography>
            <Typography component="div">
              {movie.description === null ? (
                <LoremGenerator />
              ) : (
                movie.description
              )}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              В ролях:{' '}
            </Typography>

            <List
              dense
              sx={{
                width: '100%',
                columnCount: 2,
                columnGap: '16px',
                bgcolor: 'background.paper',
              }}
            >
              {movie?.persons.map((person) => (
                <ListItem key={person.id}>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        src={person.photo}
                        alt={person.name.slice(0, 1)}
                      />
                    </ListItemAvatar>
                    <ListItemText>{person.name} </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

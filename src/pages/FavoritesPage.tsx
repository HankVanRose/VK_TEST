import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Grid, Box, Typography, Button, Container, Paper } from '@mui/material';
import MovieCard from '../components/MovieCard/MovieCard';
import FavoriteMovieStore from '../store/FavoriteMovieStore';
import { useNavigate } from 'react-router';
import UserStore from '../store/UserStore';

const FavoritesPage: React.FC = observer(() => {
  useEffect(() => {
    const loadFavorites = () => {
      FavoriteMovieStore.loadUserFavorites(Number(userId));
    };
    loadFavorites();
  }, []);
  const favorites = FavoriteMovieStore.favorites;
  const userId = UserStore.currentUser?.id;
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
            gap: 20,
          }}
        >
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

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
            }}
          >
            Избранные фильмы
          </Typography>

          <Button
            variant="contained"
            color="error"
            onClick={() => FavoriteMovieStore.deleteAllFavorites()}
            sx={{
              textTransform: 'none',
              borderRadius: '20px',
              px: 3,
            }}
          >
            Очистить всё
          </Button>
        </Box>

        {favorites.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              py: 10,
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Ваш список избранного пуст
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/')}
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                px: 4,
                py: 1,
              }}
            >
              Найти фильмы
            </Button>
          </Box>
        ) : (
          <Grid
            container
            spacing={2}
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              justifyContent: 'center',
              justifyItems: 'center',
              gap: '30px 50px',
              mt: 2.5,
            }}
          >
            {favorites.map((movie) => (
              <Grid key={movie.id}>
                <Box
                  display={'flex'}
                  justifyItems={'center'}
                  flexDirection={'column'}
                >
                  <MovieCard movie={movie} />
                  <Button
                    variant="contained"
                    onClick={() =>
                      FavoriteMovieStore.deleteFromFavorites(movie)
                    }
                  >
                    УБРАТЬ
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>
    </Container>
  );
});

export default FavoritesPage;

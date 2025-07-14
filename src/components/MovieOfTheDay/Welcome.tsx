import { observer } from 'mobx-react-lite';
import MoviesStore from '../../store/MoviesStore';
import { useEffect } from 'react';

import {
  Box,
  Button,
  Fade,
  Grow,
  Paper,
  Typography,
  useTheme,
} from '@mui/material';

import { useNavigate } from 'react-router';
import UserStore from '../../store/UserStore';

const Welcome = observer(() => {
  const theme = useTheme();
  useEffect(() => {
    MoviesStore.loadMovies();
  }, []);
  const navigate = useNavigate();
  const user = UserStore.currentUser;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/cubes.png")',
          opacity: 0.55,
          zIndex: 0,
        },
      }}
    >
      <Fade in timeout={3000}>
        <Box sx={{ position: 'relative', zIndex: 1, mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: '2px',
              mb: 2,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
              },
            }}
          >
            ДОБРО ПОЖАЛОВАТЬ В
          </Typography>

          <Grow in timeout={5500}>
            <Typography
              variant="h2"
              component="div"
              sx={{
                fontWeight: 900,
                fontSize: '4rem',
                background: `linear-gradient(to right, ${theme.palette.secondary.main}, ${theme.palette.warning.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '3rem',
                },
              }}
            >
              HVRmdb
            </Typography>
          </Grow>

          <Typography
            variant="subtitle1"
            sx={{
              mt: 3,
              maxWidth: '600px',
              mx: 'auto',
              opacity: 0.9,
              lineHeight: 1.6,
            }}
          >
            Ваша онлайн-библиотека кино с тысячами фильмов и сериалов
          </Typography>
        </Box>
      </Fade>

      <Grow in timeout={2000}>
        <Paper
          elevation={6}
          sx={{
            p: 3,
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            mt: 4,
          }}
        >
          {!user ? (
            <Box display={'flex'}flexDirection={'column'} gap={2}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  boxShadow: `0 4px 20px ${theme.palette.secondary.main}80`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 25px ${theme.palette.secondary.main}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                ЗАРЕГИСТРИРОВАТЬСЯ
              </Button>
              <Button
                variant="contained"
                color="warning"
                size="large"
                onClick={() => navigate('/search')}
                sx={{
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '50px',
                  boxShadow: `0 4px 20px ${theme.palette.warning.main}80`,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 25px ${theme.palette.warning.main}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                ПРОДОЛЖИТЬ БЕЗ РЕГИСТРАЦИИ
              </Button>
            </Box>
          ) : (
            <Button
              variant="contained"
              color="warning"
              size="large"
              onClick={() => navigate('/search')}
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: '50px',
                boxShadow: `0 4px 20px ${theme.palette.warning.main}80`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 25px ${theme.palette.warning.main}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              К ФИЛЬМАМ
            </Button>
          )}
        </Paper>
      </Grow>

      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}20, transparent 70%)`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.warning.main}10, transparent 70%)`,
          zIndex: 0,
        }}
      />
    </Box>
  );
});
export default Welcome;

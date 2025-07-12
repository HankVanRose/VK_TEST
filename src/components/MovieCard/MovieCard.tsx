import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TbBinocularsFilled } from 'react-icons/tb';
import type { Movie } from '../../api/types/movies';
import { Box } from '@mui/material';
import { FaImdb } from 'react-icons/fa';
import { SiKinopoisk } from 'react-icons/si';
import { useNavigate } from 'react-router';
import type { ICurrentMovie } from '../../api/types/currentMovie';
interface MovieCardProps {
  movie: Movie | ICurrentMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
 
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 500,
        width: 300,
        mb: 2.5,
        cursor: 'pointer',
        boxShadow:
          '0px 50px 100px -20px rgba(50, 50, 93, 0.25), 0px 30px 60px -30px rgba(0, 0, 0, 0.3)',
        background: 'lightgray',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 0 10px #000000',
          transform: 'scale(1.01)',
        },
      }}
    >
      <CardMedia
        sx={{
          height: 420,
          width: '100%',
          objectFit: 'cover',
          backgroundImage: movie?.poster?.previewUrl
            ? `url(${movie.poster.previewUrl})`
            : 'linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)',
        }}
      >
        {!movie?.poster?.previewUrl && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <TbBinocularsFilled size={200} />
            <Typography variant="body1">Постер не найден</Typography>
          </Box>
        )}
      </CardMedia>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80%',
          height: 'fit-content',
        }}
      >
        {movie?.name ? (
          <Typography
            variant="body1"
            fontWeight="medium"
            sx={{ textAlign: 'center' }}
          >
            {movie?.name}
          </Typography>
        ) : (
          <Typography variant="body1" fontWeight="medium">
            {movie?.alternativeName}
          </Typography>
        )}
        <Typography variant="body1">{movie?.year}</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SiKinopoisk size={30} style={{ color: '#ff6600' }} />
            <Typography variant="body1" sx={{ fontSize: '20px' }}>
              {movie.rating?.kp}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FaImdb size={30} style={{ color: '#f5c518' }} />
            <Typography variant="body1" sx={{ fontSize: '20px' }}>
              {movie.rating?.imdb}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

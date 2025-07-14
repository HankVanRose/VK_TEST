 
import { observer } from 'mobx-react-lite';
import { Box } from '@mui/material';
 
import MovieOfTheDay from '../components/MovieOfTheDay/Welcome';

const HomePage = observer(() => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <MovieOfTheDay />
    </Box>
  );
});

export default HomePage;

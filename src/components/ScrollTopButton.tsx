import {
  Box,
  Button,
 
  Typography,
  useScrollTrigger,
  Zoom,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function ScrollTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={trigger}>
      <Button
        color="primary"
        variant="contained"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          left: 30,
          bottom: 20,
          backgroundColor: 'rgba(6, 11, 255, 0.5)',
          '&:hover': {
            backgroundColor: 'rgba(51, 0, 255, 0.9)',
          },
          opacity: 0.7,
       
        }}
        aria-label="Наверх"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <KeyboardArrowUpIcon />
          <Typography>НАВЕРХ</Typography>
          <KeyboardArrowUpIcon />
        </Box>
      </Button>
    </Zoom>
  );
}

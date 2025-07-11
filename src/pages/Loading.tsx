import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        boxSizing: 'border-box',
      }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
}

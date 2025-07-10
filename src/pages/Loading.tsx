import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
 

export default function Loading() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
}

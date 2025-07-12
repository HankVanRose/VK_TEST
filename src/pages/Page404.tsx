import { Box, Typography } from '@mui/material';
import { TfiFaceSad } from 'react-icons/tfi';

export default function Page404() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        textAlign: 'center',
      }}
    >
      <Box>
        <Typography variant="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          ТАКОЙ СТРАНИЦЫ НЕ СУЩЕСТВУЕТ
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <TfiFaceSad size={160} />
        </Box>
      </Box>
    </Box>
  );
}

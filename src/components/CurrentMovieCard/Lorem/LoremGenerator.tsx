import { Box, Typography } from '@mui/material';

const LoremGenerator = () => {
  const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`;

  return (
    <Box>
      <Typography> {loremText}</Typography>
    </Box>
  );
};

export default LoremGenerator;

import { Box, Typography, useTheme } from '@mui/material';

interface MovieTitleProps {
  name?: string;
  alternativeName?: string;  
  year?: number;
}

export const MovieTitle = ({ name, alternativeName, year }: MovieTitleProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: theme.palette.text.primary,
        }}
      >
        {name || alternativeName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {year && (
          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            {year}
          </Typography>
        )}

        {alternativeName && (
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              fontStyle: 'italic',
            }}
          >
            {alternativeName}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
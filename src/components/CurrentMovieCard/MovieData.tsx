import { Chip, Divider, Stack, useTheme } from '@mui/material';
 

interface MovieMetadataProps {
  ageRating?: number | null;
  genres?: Array<{ name: string }>;
}

export const MovieMetadata = ({ ageRating, genres }: MovieMetadataProps) => {
  const theme = useTheme();

  return (
    <>
      <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
        <Chip
          label={ageRating ? `${ageRating}+` : 'Нет возрастного рейтинга'}
          color="primary"
          size="small"
          sx={{
            cursor: 'default',
            borderRadius: 1,
            fontWeight: 600,
          }}
        />
        {genres?.map((genre) => (
          <Chip
            key={genre.name}
            label={genre.name}
            variant="outlined"
            size="small"
            sx={{
              cursor: 'pointer',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          />
        ))}
        
      </Stack>
     
      <Divider sx={{ my: 3 }} />
    </>
  );
};

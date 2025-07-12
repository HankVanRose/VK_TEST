import { Grid, Typography } from '@mui/material';

export const MovieInfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Grid  >
    <Typography
      
      variant="subtitle2"
      color="text.secondary"
    >
      {label}
    </Typography>
    <Typography variant="subtitle2"   >{value || '-'}</Typography>
  </Grid>
);

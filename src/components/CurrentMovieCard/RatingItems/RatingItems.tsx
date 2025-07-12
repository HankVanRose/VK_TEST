import { Rating, Typography } from '@mui/material';

export const RatingItem = ({
  icon,
  value,
  label,
  
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  color?: string;
}) => (
  <>
    {icon}
    <Rating value={value / 2} precision={0.1} readOnly />
    <Typography variant="h6">{label}</Typography>
  </>
);

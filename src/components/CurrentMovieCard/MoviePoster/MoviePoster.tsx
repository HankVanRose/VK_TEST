import { Box, CardMedia, Typography } from "@mui/material";
import { TbBinocularsFilled } from "react-icons/tb";

export const MoviePoster = ({ posterUrl }: { posterUrl?: string }) => (
  <CardMedia
    component="div"
    sx={{
      position: 'relative',
      width: '100%',
      paddingTop: '150%',
      overflow: 'hidden',
      backgroundImage: posterUrl
        ? `url(${posterUrl})`
        : 'linear-gradient(45deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
    }}
  >
    {!posterUrl && (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TbBinocularsFilled size={200} />
        <Typography variant="body1">Постер не найден</Typography>
      </Box>
    )}
  </CardMedia>
);
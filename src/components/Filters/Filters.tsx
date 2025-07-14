import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useSearchParams } from 'react-router';
import {
  Box,
  Slider,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoviesStore from '../../store/MoviesStore';

const Filters: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    MoviesStore.loadGenres();
  }, []);

  const updateURLParams = () => {
    const { selectedGenres, ratingRange, yearRange } = MoviesStore.filters;
    const params: Record<string, string> = {};

    if (selectedGenres.length > 0) params.genres = selectedGenres.join(',');
    if (ratingRange[0] > 0) params.ratingMin = ratingRange[0].toString();
    if (ratingRange[1] < 10) params.ratingMax = ratingRange[1].toString();
    if (yearRange[0] > 1990) params.yearMin = yearRange[0].toString();
    if (yearRange[1] < new Date().getFullYear())
      params.yearMax = yearRange[1].toString();

    setSearchParams(params);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    MoviesStore.setRatingRange(newValue as [number, number]);
    updateURLParams();
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    MoviesStore.setYearRange(newValue as [number, number]);
    updateURLParams();
  };

  const handleGenreToggle = (genreName: string) => {
    MoviesStore.toggleGenre(genreName);
    updateURLParams();
  };

  const handleResetFilters = () => {
    MoviesStore.resetFilters();
    setSearchParams({});
  };

  return (
    <Box mb={3} mt={3}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mb={3}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography gutterBottom>Жанры</Typography>
              <Grid
                container
                sx={{ display: 'flex', justifyContent: 'space-between' }}
              >
                {[0, 1, 2].map((column) => (
                  <Grid key={column}>
                    <FormGroup>
                      {MoviesStore.genres
                        .slice(column * 8, (column + 1) * 8)
                        .map((genre) => (
                          <Grid key={genre.name} display={'flex'}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={MoviesStore.filters.selectedGenres.includes(
                                    genre.name
                                  )}
                                  onChange={() => handleGenreToggle(genre.name)}
                                />
                              }
                              label={genre.name}
                            />
                          </Grid>
                        ))}
                    </FormGroup>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
          <Box mb={3}>
            <Typography gutterBottom>
              Рейтинг IMDb: {MoviesStore.filters.ratingRange.join(' - ')}
            </Typography>
            <Slider
              value={MoviesStore.filters.ratingRange}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.5}
            />
          </Box>
          <Box mb={3}>
            <Typography gutterBottom>
              Год выпуска: {MoviesStore.filters.yearRange.join(' - ')}
            </Typography>
            <Slider
              value={MoviesStore.filters.yearRange}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={1990}
              max={new Date().getFullYear()}
            />
          </Box>
          <Button
            variant="contained"
            onClick={handleResetFilters}
            disabled={!MoviesStore.filters.isActive}
          >
            Сбросить фильтры
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default Filters;

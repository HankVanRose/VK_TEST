import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
 
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSearchParams } from 'react-router';
import FiltersStore from '../../store/FiltersStore';

const genreOptions = [
  'драма',
  'комедия',
  'боевик',
  'фантастика',
  'ужасы',
  'триллер',
  'мелодрама',
  'детектив',
  'приключения',
  'фэнтези',
];

const Filters: React.FC = observer(() => {
  const   filtersStore  = FiltersStore
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filtersStore.appliedFilters.genres?.length) {
      filtersStore.appliedFilters.genres.forEach(genre => {
        params.append('genre', genre);
      });
    }
    
    if (filtersStore.appliedFilters.rating) {
      params.append('ratingMin', filtersStore.appliedFilters.rating[0].toString());
      params.append('ratingMax', filtersStore.appliedFilters.rating[1].toString());
    }
    
    if (filtersStore.appliedFilters.year) {
      params.append('yearMin', filtersStore.appliedFilters.year[0].toString());
      params.append('yearMax', filtersStore.appliedFilters.year[1].toString());
    }
    
    setSearchParams(params);
  }, [filtersStore.appliedFilters, setSearchParams]);

  const handleGenreChange = (genre: string) => {
    filtersStore.toggleGenre(genre);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    filtersStore.setRatingRange(newValue as [number, number]);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    filtersStore.setYearRange(newValue as [number, number]);
  };

  return (
    <Box mb={3}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Фильтры</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box mb={3}>
            <Typography gutterBottom>Жанры</Typography>
            <FormGroup row>
              {genreOptions.map((genre) => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      checked={filtersStore.appliedFilters.genres?.includes(genre) || false}
                      onChange={() => handleGenreChange(genre)}
                    />
                  }
                  label={genre}
                />
              ))}
            </FormGroup>
          </Box>

          <Box mb={3}>
            <Typography gutterBottom>Рейтинг IMDb: {filtersStore.appliedFilters.rating?.join(' - ')}</Typography>
            <Slider
              value={filtersStore.appliedFilters.rating || [0, 10]}
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              min={0}
              max={10}
              step={0.1}
            />
          </Box>

          <Box mb={3}>
            <Typography gutterBottom>
              Год выпуска: {filtersStore.appliedFilters.year?.join(' - ')}
            </Typography>
            <Slider
              value={filtersStore.appliedFilters.year || [1990, new Date().getFullYear()]}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              min={1990}
              max={new Date().getFullYear()}
            />
          </Box>

          <Button
            variant="contained"
            onClick={filtersStore.applyFilters}
            disabled={filtersStore.areFiltersApplied}
          >
            Применить фильтры
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default Filters;
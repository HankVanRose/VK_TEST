// import React, { useEffect } from 'react';
// import { observer } from 'mobx-react-lite';

// import {
//   Box,
//   Slider,
//   Typography,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Paper,
//   Grid,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoviesStore from '../../store/MoviesStore';

// const Filters: React.FC = observer(() => {
//   useEffect(() => {
//     MoviesStore.loadGenres();
//   }, []);

//   const genres = MoviesStore.genres;

   

//   return (
//     <Box mb={3} mt={3}>
//       <Accordion>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography>Фильтры</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Box mb={3}>
//             <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//               <Typography gutterBottom>Жанры</Typography>

//               <Grid
//                 container
//                 sx={{ display: 'flex', justifyContent: 'space-between' }}
//               >
//                 {[0, 1, 2].map((column) => (
//                   <Grid key={column}>
//                     <FormGroup>
//                       {genres
//                         .slice(column * 8, (column + 1) * 8)
//                         .map((genre, index) => (
//                           <Grid key={`${column}-${index}`} display={'flex'}>
//                             <FormControlLabel
//                               sx={{ display: 'flex', width: 200 }}
//                               key={`${column}-${index}`}
//                               control={<Checkbox />}
//                               label={genre.name}
//                             />
//                           </Grid>
//                         ))}
//                     </FormGroup>
//                   </Grid>
//                 ))}
//               </Grid>
//             </Paper>
//           </Box>

//           <Box mb={3}>
//             <Typography gutterBottom>
//               {/* Рейтинг IMDb: {filtersStore.appliedFilters.rating?.join(' - ')} */}
//             </Typography>
//             <Slider
//               //   value={filtersStore.appliedFilters.rating || [0, 10]}
//               //   onChange={handleRatingChange}
//               valueLabelDisplay="auto"
//               min={0}
//               max={10}
//               step={0.5}
//             />
//           </Box>

//           <Box mb={3}>
//             <Typography gutterBottom>
//               {/* Год выпуска: {filtersStore.appliedFilters.year?.join(' - ')} */}
//             </Typography>
//             <Slider
//               //   value={
//               //     filtersStore.appliedFilters.year || [
//               //       1990,
//               //       new Date().getFullYear(),
//               //     ]
//               //   }
//               //   onChange={handleYearChange}
//               valueLabelDisplay="auto"
//               min={1990}
//               max={new Date().getFullYear()}
//             />
//           </Box>

//           <Button
//             variant="contained"
//             onClick={MoviesStore.applyFilters}
//             // disabled={filtersStore.areFiltersApplied}
//           >
//             Применить фильтры
//           </Button>
//         </AccordionDetails>
//       </Accordion>
//     </Box>
//   );
// });

// export default Filters;

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
  Paper,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoviesStore from '../../store/MoviesStore';

const Filters: React.FC = observer(() => {
  useEffect(() => {
    MoviesStore.loadGenres();
  }, []);

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    MoviesStore.setRatingRange(newValue as [number, number]);
  };

  const handleYearChange = (event: Event, newValue: number | number[]) => {
    MoviesStore.setYearRange(newValue as [number, number]);
  };

  const handleGenreToggle = (genreName: string) => {
    MoviesStore.toggleGenre(genreName);
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
              <Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                                  checked={MoviesStore.filters.selectedGenres.includes(genre.name)}
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
              Рейтинг: {MoviesStore.filters.ratingRange.join(' - ')}
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
            onClick={() => MoviesStore.resetFilters()}
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

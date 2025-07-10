import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontWeightLight: 300,  
    fontWeightRegular: 400,  
    fontWeightMedium: 500,  
    fontWeightBold: 700, 
  },
});

export default theme;

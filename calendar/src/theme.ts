import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif !important',
    'h6': {
      fontSize: '12px'
    },
    'h5': {
      fontSize: '14px'
    },
    'h4': {
      fontWeight: 700
    }
  },

  palette: {
    primary: {
      main: '#000',
    }
  },
});

export default theme;
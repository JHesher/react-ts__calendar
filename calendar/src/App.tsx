import React from 'react';
import './App.scss';
import { CalendarPage } from './CalendarPage/CalendarPage';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CalendarPage />
      </ThemeProvider>
    </div>
  );
};

export default App;

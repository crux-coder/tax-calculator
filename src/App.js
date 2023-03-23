import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'App.css';

import Main from 'views/Main';
import usePhrases from 'hooks/usePhrases';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3185FC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#274690',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e63b2e',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f3a712',
      contrastText: '#2e343b',
    },
    success: {
      main: '#33673b',
      contrastText: '#ffffff',
    },
    info: {
      main: '#274690',
      contrastText: '#ffffff',
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3185FC',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#274690',
      contrastText: '#ffffff',
    },
    error: {
      main: '#e63b2e',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f3a712',
      contrastText: '#2e343b',
    },
    success: {
      main: '#33673b',
      contrastText: '#ffffff',
    },
    info: {
      main: '#274690',
      contrastText: '#ffffff',
    },
  },
});

function App() {
  const [theme, setTheme] = useState(darkTheme);

  const toggleTheme = () => {
    if (theme.palette.mode === 'dark') setTheme(lightTheme);
    else setTheme(darkTheme);
  }

  const { phrases, setLanguage, language } = usePhrases();

  const handleChangeLanguage = (lang) => {
    setLanguage(lang);
  };

  document.title = phrases.title;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Main
          theme={theme.palette.mode}
          changeTheme={toggleTheme}
          phrases={phrases}
          language={language}
          changeLanguage={handleChangeLanguage}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;

const theme = {
  palette: {
    primary: {
      main: '#FFFFFF',
      light: '#FD6E35',
      dark: '#CC4400',
    },
    background: {
      body: '#FFFFFF',
    },
    text: {
      primary: '#000000',
    },
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  typography: {
    h1: {
      'font-weight': 'bold',
      'font-size': '68px',
    },
    h2: {
      'font-weight': 'bold',
      'font-size': '50px',
    },
    h3: {
      'font-weight': 'bold',
      'font-size': '38px',
    },
    h4: {
      'font-weight': '700',
      'font-size': '32px',
    },
    h5: {
      'font-weight': 'bold',
      'font-size': '22px',
    },
    h6: {
      'font-weight': '700',
      'font-size': '16px',
    },
    body: {
      'font-weight': 'normal',
      'font-size': '14px',
    },
    button: {
      'font-weight': 'bold',
      'font-size': '22px',
    },
  },
};

export default theme;

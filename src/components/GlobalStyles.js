import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontSize: '12px',
      fontWeight: 600,
    },
    body: {
      backgroundColor: '#f4f6f8',
      height: '100%',
      width: '100%',
      fontFamily: 'Open Sans',
      fontStyle: 'normal',
      fontSize: '12px',
      fontWeight: 600,
    },
    a: {
      textDecoration: 'none'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

const GlobalStyles = () => {
  useStyles();
  return null;
};

export default GlobalStyles;

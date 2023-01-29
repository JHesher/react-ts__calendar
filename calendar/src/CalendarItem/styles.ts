import { makeStyles, createStyles } from '@mui/styles';
import { theme } from './../theme';

export const useStyles = makeStyles(() =>
  createStyles({
    boxHeader: {
      display: 'flex',
      justifyContent: 'space-between'
    },

    contentBox: {
      color: '#fff',
      backgroundColor: '#000',
      borderRadius: '4px',
      marginBottom: '2px',
      padding: '4px 8px',
      cursor: 'pointer',
      textAlign: 'left'
    },

    contentTypogtaphy: {
      fontSize: '14px'
    },

    paper: {
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100%',
      background:'rgba(255,255,255, 0.3)',
      boxShadow: 'none',
      marginBottom: '2px',
      '&:hover': {
        background:'rgba(255,255,255, 0.5)',
      }
    }
  })
);
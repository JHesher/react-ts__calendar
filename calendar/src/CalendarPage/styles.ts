import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    title: {
      paddingRight: '14px'
    },
    
    pageBox: {
      padding: '50px',
       height: '100%'
    },

    headerBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: '24px'
    },

    flexBox: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  })
);
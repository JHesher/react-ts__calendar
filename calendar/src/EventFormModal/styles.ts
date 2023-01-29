import { makeStyles, createStyles } from '@mui/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontWeight: 700,
      fontSize: '24px'
    },

    subtitle: {
      fontSize: '12px !important',
      color: 'rgba(0, 0, 0, 0.6)'
    },

    inputBase: {
      paddingBottom: '12px !important'
    },

    headerBox: { 
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    modalBox: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      backgroundColor: '#fff',
      border: '2px solid #fff',
      borderRadius: '12px',
      padding: '24px',
      p: 4,
    },

    dataBox: {
      display: 'flex',
      flexDirection: 'row', 
      paddingBottom: '12px', 
      gap: '12px'
    },

    buttonBox: {
      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
      justifyContent: 'end'
    }
  })
);
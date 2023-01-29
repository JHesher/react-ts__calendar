import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { formatDate, getStorageData } from '../functions';
import { useStyles } from './styles';
import { IEvent } from '../CalendarPage/CalendarPage';

type IProps = {
  day: Date,
  setSelectedEvent: (value: IEvent) => void,
  setSelectedDate: (value: Dayjs) => void,
  handleOpen: (action: 'add' | 'edit') => void
};

export const CalendarItem: React.FC<IProps> = ({ 
  day, setSelectedDate, setSelectedEvent, handleOpen
 }) => {
  const events = getStorageData('events');
  const selectedDate = getStorageData('selectedDate');
  const classes = useStyles();

  return (
    <Paper 
     className={classes.paper}
      sx={{ 
        backgroundColor: 
          `${(selectedDate && (formatDate(selectedDate) === formatDate(day))) 
            ? '#fff' 
            : 'rgba(255,255,255, 0.3)'}`
          }}>
      <Box className={classes.boxHeader}>
        <Typography variant="h6">{dayjs(day).date()}</Typography>
        <Typography variant="h6">{dayjs(day).format('dd')}</Typography>
      </Box>
      {events && events[day.getFullYear()]?.[day.getMonth()]?.[day.getDate()]?.map((item: IEvent, index: number) => (
      <Box className={classes.contentBox} key={formatDate(item.id)}
        onClick={() => {
          setSelectedEvent(events[day.getFullYear()]?.[day.getMonth()]?.[day.getDate()]?.[index]);
          setSelectedDate(dayjs(day));
          handleOpen('edit');
        }}>
        <Typography variant="h5">
          {item.title}
        </Typography>
      </Box>
      ))}
    </Paper>
  );
}
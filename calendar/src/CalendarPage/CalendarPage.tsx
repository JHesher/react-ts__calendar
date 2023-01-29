import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { EventFormModal } from '../EventFormModal/EventFormModal';
import { Box, Grid, Button,  Typography } from '@mui/material';
import { getFullWeeksStartAndEndInMonth, getStorageData } from '../functions';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { CalendarItem } from '../CalendarItem/CalendarItem';
import { useStyles } from './styles';
// import { getGlobalState } from '../useGlobalState'; // case for REST API

export interface IEvent {
  id: Dayjs,
  title: string,
  description: string | null,
  date: Date,
  time: Date,
  createdAt: Dayjs,
  updatedAt: Dayjs
}

export type IActionOfModal = 'add' | 'edit';

export const CalendarPage: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [action, setAction] = useState<IActionOfModal>('add');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(getStorageData('selectedDate')) || dayjs());
  // const [selectedDate, setSelectedDate] = getGlobalState('selectedDate'); //case for REST API
  const [weeks, setWeeks] = useState<Date[][]>(getFullWeeksStartAndEndInMonth(selectedDate as Dayjs));
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  const handleOpen = (value: IActionOfModal) => {
    setOpen(true)
    setAction(value);
  };
  
  const pagination = (step: number) => {
    const nextMonth = dayjs(selectedDate).month() + step;
    setSelectedDate(dayjs(selectedDate).set('month', nextMonth));
    // setGlobalState('selectedDate', dayjs(selectedDate).set('month', nextMonth)); //case for REST API
  };
  
  useEffect(() => {
    selectedDate && localStorage.setItem('selectedDate', JSON.stringify(selectedDate));
    setWeeks(getFullWeeksStartAndEndInMonth(selectedDate as Dayjs));
  }, [selectedDate]);

  return (
    <Box className={classes.pageBox}>
      <Box className={classes.headerBox}>
        <Box className={classes.flexBox}>
          <Typography variant="h4" className={classes.title}>
            {dayjs(selectedDate)?.format('MMM YYYY')}
          </Typography>
          <Box className={classes.flexBox}>
            <ArrowBackIosNewRoundedIcon onClick={() => pagination(-1)}/>
            <ArrowForwardIosRoundedIcon onClick={() => pagination(1)}/>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="calendar"
              openTo="year"
              value={selectedDate}
              onChange={(newSelectedDate: Dayjs | null ) => {
                setSelectedDate(newSelectedDate);
              }}
              renderInput={({ InputProps }) => (
                <Box className={classes.flexBox}>
                  {InputProps?.endAdornment}
                </Box>
              )}
            />
          </LocalizationProvider>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          endIcon={<AddIcon />} 
          onClick={() => handleOpen('add')}
        >
          Add Event
        </Button>
      </Box>

      <Grid container spacing={1} columns={7} height={'90%'}>
        {weeks.map((week: Date[]) => (
          week.map((day: Date, index: number) => (
            <Grid item xs={1} key={index}>
              <CalendarItem
                day={day}
                setSelectedDate={setSelectedDate}
                setSelectedEvent={setSelectedEvent}
                handleOpen={handleOpen}
              />
            </Grid>
          ))
        ))}
      </Grid>
  
      <EventFormModal 
        open={open} 
        setOpen={setOpen} 
        action={action} 
        selectedEvent={selectedEvent} 
        setSelectedDate={setSelectedDate}
      />
    </Box>
  );
};
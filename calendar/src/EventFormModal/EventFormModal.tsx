import React from 'react';
import { Box, Modal, Typography, TextField, Button } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import dayjs, { Dayjs } from 'dayjs';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { IActionOfModal, IEvent } from '../CalendarPage/CalendarPage';
import { getStorageData } from '../functions';
import { useStyles } from './styles';

type IProps = {
  action: IActionOfModal,
  selectedEvent: IEvent | null,
  open: boolean,
  setOpen: (value: boolean) => void,
  setSelectedDate: (value: Dayjs) => void
};

export const EventFormModal: React.FC<IProps> = ({ 
  open, setOpen, action, selectedEvent, setSelectedDate
 }) => {
  const classes = useStyles();
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    date: Yup.string().required('Date is required'),
  });

  const { handleSubmit, reset, control, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FieldValues) => {
    const year = dayjs(data.date).year();
    const month = dayjs(data.date).month();
    const day = dayjs(data.date).date();

    const newEvent = {
      id: dayjs(),
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      createdAt: action === 'add' ? dayjs() : selectedEvent?.createdAt,
      updatedAt: action === 'edit' ? dayjs() : null
    }

    if (action === 'edit') {
      deleteEvent();
    }

    const events = getStorageData('events');
    
    if (events) {
      if (events[year]) {
        if (events[year][month]) {
          if (events[year][month][day]) {
            events[year][month][day].push(newEvent)
          } else {
            events[year][month] = ({
              ...events[year][month],
              [day]: [newEvent]
            })
          }
        } else {
          events[year] = ({
            ...events[year],
            [month] : {
              [day]: [newEvent]
            }
          })
        }
      } else {
        events[year] = ({
          [month]: {
            [day]: [
              newEvent
            ]
          }
        })
      }
    } else {
      localStorage.setItem('events', JSON.stringify({
        [year]: {
          [month]: {
            [day]: [
              newEvent
            ]
          }
        }
      }));
      closeModal();
      localStorage.setItem('selectedDate', JSON.stringify(newEvent.date));
      setSelectedDate(data.date);
      return;
    }
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('selectedDate', JSON.stringify(newEvent.date));
    setSelectedDate(data.date);
    closeModal();
  };

  const deleteEvent = () => {
    const events = getStorageData('events');
    const filtredEvents = events[dayjs(selectedEvent?.date)
      .year()][dayjs(selectedEvent?.date)
        .month()][dayjs(selectedEvent?.date)
          .date()].filter((value: IEvent) => 
      (value.id !== selectedEvent?.id)
    );
    events[dayjs(selectedEvent?.date)
      .year()][dayjs(selectedEvent?.date)
        .month()][dayjs(selectedEvent?.date)
          .date()] = [ ...filtredEvents ]
    localStorage.setItem('events', JSON.stringify(events));
  };

  const closeModal = () => {
    setOpen(false);
    reset();
  };
  
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalBox}>
        <Box flexDirection={'column'}>
          <Box className={classes.headerBox}>
            <Typography id="modal-modal-title" className={classes.title}>
              {action === 'add' ? 'Add new event' : 'Edit event'}
            </Typography>
            <CloseRoundedIcon onClick={closeModal}/>
          </Box>

          {action === 'edit' ? (
            <Box>
              <Typography className={classes.subtitle}>
                {`Created at: ${dayjs(selectedEvent?.createdAt).format('lll')}`}
              </Typography>
              {selectedEvent?.updatedAt ? (
                <Typography className={classes.subtitle}>
                  {`Updated at: ${dayjs(selectedEvent?.updatedAt).format('lll')}`}
                </Typography>
              ) : null}
            </Box>
          ) : null}
        </Box>

        <Box sx={{ paddingTop: '24px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              className={classes.inputBase}
              id="outlined-required"
              label="Title*"
              defaultValue={action === 'edit' ? selectedEvent?.title : null}
              {...register('title')}
              helperText={errors.title ? 'Title is required' : false}
            />
            <TextField
              fullWidth
              className={classes.inputBase}
              id="outlined-required"
              label="Description"
              defaultValue={action === 'edit' ? selectedEvent?.description : null}
              {...register('description')}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box className={classes.dataBox}>
                <Controller
                  name="date"
                  control={control}
                  defaultValue={action === 'edit' ? selectedEvent?.date : null}
                  render={({ field}) => (
                    <DatePicker
                      label="Date*"
                      value={field.value}
                      minDate={dayjs('2017-01-01')}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField 
                          {...params} 
                          helperText={errors.date ? 'Date is required' : false}/>
                      )}
                    />
                  )}
                />
                <Controller
                  name="time"
                  control={control}
                  defaultValue={action === 'edit' ? selectedEvent?.time : null}
                  render={({ field }) => (
                    <TimePicker
                      label="Time"
                      value={field.value}
                      onChange={(newValue) => {
                        field.onChange(newValue);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                />
              </Box>
            </LocalizationProvider>

            <Box className={classes.buttonBox}>
              {action === 'edit' ? (
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => { 
                    deleteEvent(); 
                    closeModal();
                  }}>
                  Delete
                </Button>
              ) : null}
              <Button variant="contained" type="submit" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
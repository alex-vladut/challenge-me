import React, { useState } from 'react';

import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';
import { Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { connect } from 'react-redux';
import { CreateActivity } from '../../store/actions/activities.actions';

const useStyles = makeStyles(theme => ({
  button: { marginTop: theme.spacing(3) },
}));

const validate = (form: any) => {
  let errors: any = {};
  if (!form.title || form.title.length < 10 || form.title.length > 500) {
    errors = { ...errors, title: 'Please provide a title between 10 and 200 chars long.' };
  }
  if (!form.numberOfAttendants || form.numberOfAttendants < 1 || form.numberOfAttendants > 100) {
    errors = { ...errors, numberOfAttendants: 'You could select between 1 and 100 attendants.' };
  }
  if (!form.dateTime || moment(form.dateTime).subtract(1, 'day').isBefore(moment())) {
    errors = { ...errors, dateTime: 'The time of your activity should be at least one day in the future.' }
  }
  return errors;
}

export interface ActivityProps {
  loading: boolean
  createActivity(activity: any): void
}

const Activity = (props: ActivityProps) => {
  const classes = useStyles();

  const nextMonth = moment().add(1, 'month').hour(10).minute(0).second(0).toDate();
  const [dateTime, setDateTime] = useState<Date | null>(nextMonth);
  const [title, setTitle] = useState<string>('');
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(1);
  const [errors, setErrors] = useState<any>({});

  const handleDateChange = (date: Date | null) => setDateTime(date);
  const handleTitleChange = (event: any) => setTitle(event.target.value);
  const handleNumberOfAttendantsChange = (event: any) => setNumberOfAttendants(Number(event.target.value));

  const submit = (event: any) => {
    event.preventDefault();
    const activity = { title, dateTime, numberOfAttendants };
    const errors = validate({ title, dateTime, numberOfAttendants });
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      props.createActivity(activity);
    }
  };

  return (
    <form onSubmit={submit}>
      <TextField
        required
        fullWidth
        error={!!errors.title}
        helperText={errors.title}
        label="Title"
        value={title} onChange={handleTitleChange} />
      {/* create component for date/time picking */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-between">
          <KeyboardDatePicker
            margin="normal" label="Date"
            value={dateTime} onChange={handleDateChange}
            KeyboardButtonProps={{ 'aria-label': 'change date' }} />
          <KeyboardTimePicker margin="normal" label="Time"
            value={dateTime} onChange={handleDateChange}
            KeyboardButtonProps={{ 'aria-label': 'change time' }} />
        </Grid>
      </MuiPickersUtilsProvider>
      <TextField required fullWidth label="Number of attendants" type="number"
        value={numberOfAttendants} onChange={handleNumberOfAttendantsChange} />

      <Grid container alignItems="flex-start" justify="flex-end">
        <Button variant="contained" color="primary" className={classes.button} type="submit">Save</Button>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state: any) => ({
  loading: state.activities.loading,
})

const mapDispatchToProps = (dispatch: any) => ({
  createActivity: (activity: any) => dispatch(CreateActivity.create(activity)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
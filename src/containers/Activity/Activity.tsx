import React, { useState, FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import moment from "moment";
import { useSnackbar } from "notistack";
import { Grid, TextField, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import { Create, CleanMessages } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

const useStyles = makeStyles(theme => ({
  button: { marginTop: theme.spacing(3) }
}));

const validate = (form: any) => {
  let errors: any = {};
  if (!form.title || form.title.length < 10 || form.title.length > 200) {
    errors = {
      ...errors,
      title: "Please provide a title between 10 and 200 chars long."
    };
  }
  if (!form.description || form.description.length < 10 || form.description.length > 1000) {
    errors = {
      ...errors,
      description: "Please provide a description between 10 and 1000 chars long."
    };
  }
  if (!form.numberOfAttendants || form.numberOfAttendants < 1 || form.numberOfAttendants > 100) {
    errors = {
      ...errors,
      numberOfAttendants: "You should select between 1 and 100 attendants."
    };
  }
  if (
    !form.dateTime ||
    moment(form.dateTime)
      .subtract(1, "day")
      .isBefore(moment())
  ) {
    errors = {
      ...errors,
      dateTime: "The time of your activity should be at least one day in the future."
    };
  }
  return errors;
};

export interface ActivityProps {
  loading: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  createActivity(activity: any): void;
  cleanMessages(): void;
}

const Activity: FunctionComponent<ActivityProps> = ({ loading, successMessage, errorMessage, createActivity, cleanMessages }: ActivityProps) => {
  const classes = useStyles();

  const nextMonth = moment()
    .add(1, "month")
    .hour(10)
    .minute(0)
    .second(0)
    .toDate();
  const [dateTime, setDateTime] = useState<Date | null>(nextMonth);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(1);
  const [errors, setErrors] = useState<any>({});

  // TODO extract this code in a distinct component
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (successMessage) {
      enqueueSnackbar(successMessage, { variant: "success" });
      cleanMessages();
    }
  }, [successMessage, enqueueSnackbar, cleanMessages]);
  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, { variant: "error" });
      cleanMessages();
    }
  }, [errorMessage, enqueueSnackbar, cleanMessages]);

  const handleDateChange = (date: Date | null) => setDateTime(date);
  const handleTitleChange = (event: any) => setTitle(event.target.value);
  const handleDescriptionChange = (event: any) => setDescription(event.target.value);
  const handleNumberOfAttendantsChange = (event: any) => setNumberOfAttendants(Number(event.target.value));

  const submit = (event: any) => {
    event.preventDefault();
    const activity = { title, description, dateTime, numberOfAttendants };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      createActivity(activity);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (successMessage) {
    return <Redirect to="/activities" />;
  }

  return (
    <form onSubmit={submit}>
      <TextField label="Title" value={title} onChange={handleTitleChange} error={!!errors.title} helperText={errors.title} required fullWidth />
      <TextField label="Description" value={description} onChange={handleDescriptionChange} error={!!errors.description} helperText={errors.description} multiline rowsMax="5" fullWidth required />
      <DateTimePicker value={dateTime} onChange={handleDateChange} />
      <TextField
        required
        fullWidth
        label="Number of attendants"
        type="number"
        value={numberOfAttendants}
        onChange={handleNumberOfAttendantsChange}
        error={!!errors.numberOfAttendants}
        helperText={errors.numberOfAttendants}
      />

      <Grid container alignItems="flex-start" justify="flex-end">
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Save
        </Button>
      </Grid>
    </form>
  );
};

const mapStateToProps = ({ activities: { loading, successMessage, errorMessage } }: State) => ({
  loading,
  successMessage,
  errorMessage
});

const mapDispatchToProps = (dispatch: any) => ({
  createActivity: (activity: any) => dispatch(Create.create(activity)),
  cleanMessages: () => dispatch(CleanMessages.create())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);

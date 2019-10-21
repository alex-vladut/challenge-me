import React, { useState, FunctionComponent } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import moment from "moment";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import DateTimePicker from "../../components/DateTimePicker/DateTimePicker";
import AddressSelection from "./AddressSelection";
import { Create } from "../../store/actions/activities.actions";
import { State } from "../../store/reducers";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "1rem",
    backgroundColor: theme.palette.background.paper
  },
  button: { marginTop: theme.spacing(3) }
}));

const validate = (form: any) => {
  let errors: any = {};
  if (!form.sport) {
    errors = { ...errors, sport: "Please select the type of sport." };
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
  if (!form.location) {
    errors = {
      ...errors,
      location: "Please select a location for your activity."
    };
  }
  return errors;
};

export interface ActivityProps {
  loading: boolean;
  created: boolean;
  sports: any[];
  createActivity(activity: any): void;
}

const Activity: FunctionComponent<ActivityProps> = ({ loading, created, sports, createActivity }: ActivityProps) => {
  const classes = useStyles();

  const nextMonth = moment()
    .add(1, "month")
    .hour(10)
    .minute(0)
    .second(0)
    .toDate();

  const [description, setDescription] = useState<string>("");
  const [sport, setSport] = useState<any>(sports[0]);
  const [dateTime, setDateTime] = useState<Date | null>(nextMonth);
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(1);
  const [location, setLocation] = useState<any>();
  const [errors, setErrors] = useState<any>({});

  const handleDescriptionChange = (event: any) => setDescription(event.target.value);
  const handleSportChange = (event: any) => setSport(event.target.value);
  const handleDateChange = (date: Date | null) => setDateTime(date);
  const handleNumberOfAttendantsChange = (event: any) => setNumberOfAttendants(Number(event.target.value));

  const submit = (event: any) => {
    event.preventDefault();
    const activity = { description, sport: sport.name, dateTime, numberOfAttendants, ...location };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      createActivity(activity);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }
  if (created) {
    return <Redirect to="/activities" />;
  }

  return (
    <Box className={classes.root}>
      <form onSubmit={submit}>
        <TextField
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
          error={!!errors.description}
          helperText={errors.description}
          multiline
          rows="3"
          rowsMax="5"
          fullWidth
          required
        />
        <FormControl fullWidth required error={!!errors.sport}>
          <InputLabel htmlFor="sport">Choose a sport</InputLabel>
          <Select value={sport} onChange={handleSportChange} inputProps={{ id: "name" }}>
            {sports.map(sport => (
              <MenuItem value={sport} key={sport.name}>
                {sport.emoji} {sport.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <AddressSelection
          error={!!errors.location}
          helperText={errors.location}
          onLocationChanged={value => setLocation(value)}
        />

        <Grid container alignItems="flex-start" justify="flex-end">
          <Button variant="contained" color="primary" className={classes.button} type="submit">
            Save
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

const mapStateToProps = ({ activities: { loading, created, sports } }: State) => ({
  loading,
  created,
  sports
});

const mapDispatchToProps = (dispatch: any) => ({
  createActivity: (activity: any) => dispatch(Create.create(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);

import React, { FunctionComponent } from "react";

import DateFnsUtils from "@date-io/date-fns";
import { Grid } from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";

interface DateTimePickerProps {
  value: Date | null;
  onChange: (dateTime: Date | null) => void;
}

const DateTimePicker: FunctionComponent<DateTimePickerProps> = (
  props: DateTimePickerProps
) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-between">
        <KeyboardDatePicker
          margin="normal"
          label="Date"
          value={props.value}
          onChange={props.onChange}
          KeyboardButtonProps={{ "aria-label": "change date" }}
        />
        <KeyboardTimePicker
          margin="normal"
          label="Time"
          value={props.value}
          onChange={props.onChange}
          KeyboardButtonProps={{ "aria-label": "change time" }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePicker;

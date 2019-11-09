import React, { FunctionComponent, useState } from "react";
import { TextField } from "@material-ui/core";

const validate = (form: any) => {
  let errors: any = {};
  if (!form.numberOfAttendants || form.numberOfAttendants < 1 || form.numberOfAttendants > 100) {
    errors = {
      ...errors,
      numberOfAttendants: "You should select between 1 and 100 attendants."
    };
  }
  return errors;
};

export interface AttendantsProps {}

const Attendants: FunctionComponent<AttendantsProps> = () => {
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(1);
  const [errors, setErrors] = useState<any>({});

  const handleNumberOfAttendantsChange = (event: any) => setNumberOfAttendants(Number(event.target.value));

  const next = (event: any) => {
    event.preventDefault();
    const activity = { numberOfAttendants };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
    }
  };

  return (
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
  );
};

export default Attendants;

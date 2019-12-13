import React, { FunctionComponent, useState } from "react";

import { TextField } from "@material-ui/core";

import BaseStep from "../BaseStep";

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

export interface AttendantsProps {
  isFirst: boolean;
  isLast: boolean;
  onBack(): void;
  onNext(dateTime: any): void;
}

const Attendants: FunctionComponent<AttendantsProps> = ({ isFirst, isLast, onBack, onNext }) => {
  const [numberOfAttendants, setNumberOfAttendants] = useState<number>(1);
  const [errors, setErrors] = useState<any>({});

  const handleNumberOfAttendantsChange = (event: any) => setNumberOfAttendants(Number(event.target.value));

  const handleNext = () => {
    const activity = { numberOfAttendants };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      onNext({ numberOfAttendants });
    }
  };

  return (
    <BaseStep isFirst={isFirst} isLast={isLast} onBack={onBack} onNext={handleNext}>
      <TextField
        required
        fullWidth
        autoFocus
        label="Number of attendants"
        type="number"
        value={numberOfAttendants}
        onChange={handleNumberOfAttendantsChange}
        error={!!errors.numberOfAttendants}
        helperText={errors.numberOfAttendants}
      />
    </BaseStep>
  );
};

export default Attendants;

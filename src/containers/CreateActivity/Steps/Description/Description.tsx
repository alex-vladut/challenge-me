import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';

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
  return errors;
};

export interface DescriptionProps {
  sports: any[];
}

const Description: FunctionComponent<DescriptionProps> = ({ sports }) => {
  const [description, setDescription] = useState<string>("");
  const [sport, setSport] = useState<any>(sports[0]);
  const [errors, setErrors] = useState<any>({});

  const handleDescriptionChange = (event: any) => setDescription(event.target.value);
  const handleSportChange = (event: any) => setSport(event.target.value);

  const next = (event: any) => {
    event.preventDefault();
    const activity = { description, sport: sport.name };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default Description;

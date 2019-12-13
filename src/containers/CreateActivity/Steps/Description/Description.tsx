import React, { FunctionComponent, useState } from "react";
import { TextField } from "@material-ui/core";

import Autocomplete from "../../../../components/Autocomplete";
import BaseStep from "../BaseStep";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      marginBottom: theme.spacing(2)
    }
  })
);

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
  return errors;
};

export interface DescriptionProps {
  sports: any[];
  isFirst: boolean;
  isLast: boolean;
  onBack(): void;
  onNext(description: any): void;
}

const Description: FunctionComponent<DescriptionProps> = ({ sports, isFirst, isLast, onBack, onNext }) => {
  const classes = useStyles();

  const [description, setDescription] = useState<string>("");
  const [sport, setSport] = useState<any>(sports[0]);
  const [errors, setErrors] = useState<any>({});

  const handleDescriptionChange = (event: any) => setDescription(event.target.value);
  const handleSportChange = (event: any) => setSport(event);

  const handleNext = () => {
    const activity = { description, sport: sport.name };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      onNext({ description, sport: sport.name });
    }
  };

  return (
    <BaseStep isFirst={isFirst} isLast={isLast} onBack={onBack} onNext={handleNext}>
      <TextField
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        error={!!errors.description}
        helperText={errors.description}
        className={classes.description}
        autoFocus
        multiline
        rows="3"
        rowsMax="5"
        fullWidth
        required
      />
      <Autocomplete
        value={sport}
        onChange={handleSportChange}
        suggestions={sports}
        label="Sport"
        placeholder="Search for a sport"
        mapValue={sport => ({ label: `${sport.emoji} ${sport.name}`, value: sport.name })}
      />
    </BaseStep>
  );
};

export default Description;

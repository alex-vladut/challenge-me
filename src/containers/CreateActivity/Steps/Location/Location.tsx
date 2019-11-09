import React, { FunctionComponent, useState } from "react";

import Address from "../../../../components/Address/Address";
import BaseStep from "../BaseStep";

const validate = (form: any) => {
  let errors: any = {};
  if (!form.location) {
    errors = {
      ...errors,
      location: "Please select a location for your activity."
    };
  }
  return errors;
};

export interface LocationProps {
  isFirst: boolean;
  isLast: boolean;
  onBack(): void;
  onNext(dateTime: any): void;
}

const Location: FunctionComponent<LocationProps> = ({ isFirst, isLast, onBack, onNext }) => {
  const [location, setLocation] = useState<any>();
  const [errors, setErrors] = useState<any>({});

  const handleNext = () => {
    const errors = validate({ ...location });
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      onNext({ ...location });
    }
  };

  return (
    <BaseStep isFirst={isFirst} isLast={isLast} onBack={onBack} onNext={handleNext}>
      <Address error={!!errors.location} helperText={errors.location} onLocationChanged={setLocation} />
    </BaseStep>
  );
};

export default Location;

import React, { FunctionComponent, useState } from 'react';

import Address from '../../../../components/Address/Address';

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

export interface LocationProps {}
const Location: FunctionComponent<LocationProps> = () => {

  const [location, setLocation] = useState<any>();
  const [errors, setErrors] = useState<any>({});

  const next = (event: any) => {
    event.preventDefault();
    const activity = { ...location };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
    }
  };

  return <Address error={!!errors.location} helperText={errors.location} onLocationChanged={setLocation} />;
};

export default Location;

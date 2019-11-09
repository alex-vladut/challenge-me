import React, { FunctionComponent, useState } from 'react';
import moment from 'moment';

import DateTimePicker from '../../../../components/DateTimePicker/DateTimePicker';

const validate = (form: any) => {
  let errors: any = {};
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

export interface DateTimeProps {}

const DateTime: FunctionComponent<DateTimeProps> = () => {
  const nextMonth = moment()
    .add(1, "month")
    .hour(10)
    .minute(0)
    .second(0)
    .toDate();
  const [dateTime, setDateTime] = useState<Date | null>(nextMonth);
  const [errors, setErrors] = useState<any>({});

  const handleDateChange = (date: Date | null) => setDateTime(date);

  const next = (event: any) => {
    event.preventDefault();
    const activity = { dateTime };
    const errors = validate(activity);
    setErrors(errors);

    if (Object.values(errors).length === 0) {
    }
  };
  return <DateTimePicker value={dateTime} onChange={handleDateChange} />;
};

export default DateTime;

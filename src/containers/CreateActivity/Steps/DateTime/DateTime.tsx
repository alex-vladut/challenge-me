import React, { FunctionComponent, useState } from "react";

import subtractDays from "date-fns/subDays";
import isBefore from "date-fns/isBefore";
import addMonths from "date-fns/addMonths";

import InputLabel from "@material-ui/core/InputLabel";

import DateTimePicker from "../../../../components/DateTimePicker/DateTimePicker";
import BaseStep from "../BaseStep";

const validate = (form: any) => {
  let errors: any = {};
  if (!form.dateTime || isBefore(subtractDays(new Date(form.dateTime), 1), new Date())) {
    errors = {
      ...errors,
      dateTime: "The time of your activity should be at least one day in the future."
    };
  }
  return errors;
};

const date = new Date();
date.setHours(11);
date.setMinutes(0);
const nextMonth = addMonths(date, 1);

export interface DateTimeProps {
  isFirst: boolean;
  isLast: boolean;
  onBack(): void;
  onNext(dateTime: any): void;
}

const DateTime: FunctionComponent<DateTimeProps> = ({ isFirst, isLast, onBack, onNext }) => {
  const [dateTime, setDateTime] = useState<Date | null>(nextMonth);
  const [errors, setErrors] = useState<any>({});

  const handleDateChange = (date: Date | null) => setDateTime(date);

  const handleNext = () => {
    const errors = validate({ dateTime });
    setErrors(errors);

    if (Object.values(errors).length === 0) {
      onNext({ dateTime });
    }
  };
  return (
    <BaseStep isFirst={isFirst} isLast={isLast} onBack={onBack} onNext={handleNext}>
      <DateTimePicker value={dateTime} onChange={handleDateChange} />
      {!!errors.dateTime ? <InputLabel error={errors.dateTime}>{errors.dateTime}</InputLabel> : null}
    </BaseStep>
  );
};

export default DateTime;

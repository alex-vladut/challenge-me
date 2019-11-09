import React, { FunctionComponent, useState } from "react";
import moment from "moment";

import { InputLabel } from "@material-ui/core";

import DateTimePicker from "../../../../components/DateTimePicker/DateTimePicker";
import BaseStep from "../BaseStep";

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

const nextMonth = moment()
  .add(1, "month")
  .hour(10)
  .minute(0)
  .second(0)
  .toDate();

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

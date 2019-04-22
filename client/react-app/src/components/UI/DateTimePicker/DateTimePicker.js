import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import withLabelAndErrorMessage from '../HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';

class DateTimePicker extends Component {

    state = {
        isCalendarOpen: false
    }

    updateDateTime = (dateTime) => {
        this.props.onChange(dateTime);

        this.toggleCalendar();
    }

    toggleCalendar = (e) => {
        e && e.preventDefault();
        this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
    }

    render() {
        const cssClasses = ["DateTimePicker"];
        if (this.props.errorMessage) {
            cssClasses.push("DateTimePickerInvalid");
        }
        return (
            <div
                className={cssClasses.join(' ')}
                onClick={this.toggleCalendar}>
                {moment(this.props.dateTime).format("DD-MM-YYYY HH:mm")}

                {this.state.isCalendarOpen &&
                    <DatePicker
                        selected={this.props.dateTime}
                        onChange={this.updateDateTime}
                        showTimeSelect
                        withPortal
                        inline
                        timeIntervals={60}
                        timeFormat="HH:mm"
                        dateFormat="DD/MM/YYYY HH:mm" />}
            </div>
        )
    }
};

export default withLabelAndErrorMessage(DateTimePicker);
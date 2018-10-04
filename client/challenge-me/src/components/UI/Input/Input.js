import React from 'react';

import withLabelAndErrorMessage from '../HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import './Input.css'

const input = (props) => {
    const classes = ['InputElement'];
    if (props.errorMessage) {
        classes.push('Invalid');
    }
    return (
        <input className={classes.join(' ')} onChange={props.onChange} placeholder={props.placeholder} />
    );
};

export default withLabelAndErrorMessage(input);
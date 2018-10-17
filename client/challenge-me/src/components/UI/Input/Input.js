import React from 'react';

import withLabelAndErrorMessage from '../HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import './Input.css'

const input = (props) => {
    const classes = ['InputElement'];
    if (props.errorMessage) {
        classes.push('Invalid');
    }
    return (
        <div className="Input">
            <input className={classes.join(' ')} onChange={props.onChange} placeholder={props.placeholder} />
        </div>
    );
};

export default withLabelAndErrorMessage(input);
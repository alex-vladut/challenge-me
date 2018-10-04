import React from 'react';

import withLabelAndErrorMessage from '../HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import './TextArea.css';

const textArea = (props) => {
    const classes = ["TextArea"]
    if (props.errorMessage) {
        classes.push("TextAreaInvalid");
    }
    return (
        <textarea
            className={classes.join(' ')}
            onChange={props.onChange} />
    );
}

export default withLabelAndErrorMessage(textArea);
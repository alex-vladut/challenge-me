import React from 'react';

import withLabelAndErrorMessage from '../HigherOrderComponents/withLabelAndErrorMessage/withLabelAndErrorMessage';

import './TextArea.css';

const textArea = (props) => {
    const classes = ["TextAreaElement"]
    if (props.errorMessage) {
        classes.push("TextAreaElementInvalid");
    }
    return (
        <div className="TextArea">
            <textarea
                className={classes.join(' ')}
                onChange={props.onChange} />
        </div>
    );
}

export default withLabelAndErrorMessage(textArea);
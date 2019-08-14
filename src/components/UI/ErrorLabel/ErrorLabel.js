import React from 'react';

import './ErrorLabel.css';

const errorLabel = (props) => (
    <p className="ErrorLabel">{props.children}</p>
);

export default errorLabel;
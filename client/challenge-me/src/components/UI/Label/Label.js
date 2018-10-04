import React from 'react';

import './Label.css';

const label = (props) => (
    <label className="Label">{props.children}</label>
);

export default label;
import React from 'react';

import './Close.css';

const close = (props) => (
    <div onClick={props.onClick} className="Close">✖</div>
);

export default close;
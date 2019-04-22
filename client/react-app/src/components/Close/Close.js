import './Close.scss';

import React from 'react';

const close = (props) => (
    <div onClick={props.onClick} className="Close">✖</div>
);

export default close;
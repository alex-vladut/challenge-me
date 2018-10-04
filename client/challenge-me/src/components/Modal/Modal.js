import React from 'react';

import './Modal.css';

const modal = (props) => (
    <div
        className="Modal"
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        <div onClick={props.onCancel} className="Close">✖</div>

        {props.children}
    </div>
);

export default modal;
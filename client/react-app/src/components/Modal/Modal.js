import React from 'react';

import Close from '../Close/Close';

import './Modal.css';

const modal = (props) => (
    <div
        className="Modal"
        style={{
            transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        <Close onClick={props.onCancel} />
        
        {props.children}
    </div>
);

export default modal;
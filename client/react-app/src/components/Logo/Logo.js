import './Logo.scss';

import React from 'react';

import challengeMeLogo from '../../assets/challenge-me-logo.png';

const logo = () => (
    <div className="Logo">
        <img src={challengeMeLogo} alt="Challenge me!"></img>
    </div>
);

export default logo;
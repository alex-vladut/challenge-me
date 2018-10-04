import React from 'react';

import burgerLogo from '../../assets/burger-logo.png';
import './Logo.css'

const logo = () => (
    <div className="Logo">
        <img src={burgerLogo} alt="Logo"></img>
    </div>
);

export default logo;
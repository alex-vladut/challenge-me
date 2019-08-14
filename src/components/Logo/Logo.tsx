import './Logo.scss';

import React, { FunctionComponent } from 'react';

import challengeMeLogo from '../../assets/challenge-me-logo.png';

const Logo: FunctionComponent = () =>
  (<div className="Logo">
    <img src={challengeMeLogo} alt="Challenge me!"></img>
  </div>);

export default Logo;
import "./Logo.scss";

import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";

const Logo: FunctionComponent = () => (
  <div className="Logo">
    <NavLink to="/">
      <img src={logo} alt="Challenge me!" />
    </NavLink>
  </div>
);

export default Logo;

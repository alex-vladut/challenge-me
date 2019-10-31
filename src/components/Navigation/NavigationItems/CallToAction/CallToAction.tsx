import "./CallToAction.scss";

import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface CallToActionProps {
  onClick?(): void;
  link: string;
  children: React.ReactNode;
  exact?: boolean;
}

const CallToAction: FunctionComponent<CallToActionProps> = props => (
  <li className="CallToAction" onClick={props.onClick}>
    <NavLink to={props.link} exact>
      {props.children}
    </NavLink>
  </li>
);

export default CallToAction;

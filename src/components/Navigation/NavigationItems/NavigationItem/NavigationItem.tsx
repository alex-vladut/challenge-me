import "./NavigationItem.scss";

import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";

interface NavigationItemProps {
  onClick?(): void;
  link: string;
  children: React.ReactNode;
  exact?: boolean;
}

const NavigationItem: FunctionComponent<NavigationItemProps> = props => (
  <li className="NavigationItem" onClick={props.onClick}>
    <NavLink to={props.link} exact>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;

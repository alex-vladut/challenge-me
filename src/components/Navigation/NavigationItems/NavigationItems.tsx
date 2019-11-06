import "./NavigationItems.scss";

import React, { FunctionComponent } from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import CallToAction from './CallToAction/CallToAction';

interface NavigationItemsProps {
  isAuthenticated: boolean;
  onClick?(): void;
}

const NavigationItems: FunctionComponent<NavigationItemsProps> = props => {
  let navItems = null;
  if (props.isAuthenticated) {
    navItems = (
      <ul className="NavigationItems">
        <NavigationItem link="/activities/new" onClick={props.onClick}>
          Create
        </NavigationItem>
        <NavigationItem link="/" onClick={props.onClick}>
          Activities
        </NavigationItem>
        <NavigationItem link="/profile" onClick={props.onClick}>
          Profile
        </NavigationItem>
        <NavigationItem link="/logout" onClick={props.onClick}>
          Log Out
        </NavigationItem>
      </ul>
    );
  } else {
    navItems = (
      <ul className="NavigationItems">
        <CallToAction link="/auth" onClick={props.onClick}>
          Sign Up / Log In
        </CallToAction>
      </ul>
    );
  }
  return navItems;
};

export default NavigationItems;

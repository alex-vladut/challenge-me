import "./NavigationItems.scss";

import React, { FunctionComponent } from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import CallToAction from "./CallToAction/CallToAction";
import Profile from "./Profile/Profile";
import Notifications from "./Notifications/Notifications";

interface NavigationItemsProps {
  isAuthenticated: boolean;
  profile: any;
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
        <Notifications notifications={props.profile.notifications} />
        <Profile profile={props.profile} />
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

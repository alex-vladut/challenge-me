import './NavigationItems.scss';

import React, { FunctionComponent } from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

interface NavigationItemsProps {
  isAuthenticated: boolean
  onClick?(): void
}

const NavigationItems: FunctionComponent<NavigationItemsProps> = props => {
  let navItems = null;
  if (props.isAuthenticated) {
    navItems = (
      <ul className="NavigationItems">
        <NavigationItem link="/" onClick={props.onClick} exact >Home</NavigationItem>
        <NavigationItem link="/challenges/new" onClick={props.onClick} >New Challenge</NavigationItem>
        <NavigationItem link="/activities/new" onClick={props.onClick} >New activity</NavigationItem>
        <NavigationItem link="/challenges" onClick={props.onClick} >Challenges</NavigationItem>
        <NavigationItem link="/logout" onClick={props.onClick} >Log Out</NavigationItem>
      </ul>
    )
  } else {
    navItems = (
      <ul className="NavigationItems">
        <NavigationItem link="/auth" onClick={props.onClick} >Log In</NavigationItem>
      </ul>
    )
  }
  return navItems;
}

export default NavigationItems;
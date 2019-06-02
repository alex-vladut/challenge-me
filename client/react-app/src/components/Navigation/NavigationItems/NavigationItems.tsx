import './NavigationItems.scss';

import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import { SignOut } from '../../../store/actions/auth.actions';
import NavigationItem from './NavigationItem/NavigationItem';

interface NavigationItemsProps {
  authenticated: boolean
  onClick?(): void
  signOut(): void
}

const NavigationItems: FunctionComponent<NavigationItemsProps> = props => {
  let navItems = null;
  if (props.authenticated) {
    navItems = (
      <ul className="NavigationItems">
        <NavigationItem link="/" onClick={props.onClick} exact >Home</NavigationItem>
        <NavigationItem link="/challenges/new" onClick={props.onClick} >New Challenge</NavigationItem>
        <NavigationItem link="/challenges" onClick={props.onClick} >Challenges</NavigationItem>
        <NavigationItem link="/" onClick={props.signOut} >Log Out</NavigationItem>
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

const mapStateToProps = (state: any) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(SignOut.create()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
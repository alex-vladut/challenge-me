import './NavigationItems.scss';

import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/actions';
import { State } from '../../../store/reducer';
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
        <NavigationItem link="/challenges/new-challenge" onClick={props.onClick} >New Challenge</NavigationItem>
        <NavigationItem link="/challenges" onClick={props.onClick} >Challenges</NavigationItem>
        <NavigationItem link="/" onClick={props.signOut} >Sign Out</NavigationItem>
      </ul>
    )
  }
  return navItems;
}

const mapStateToProps = (state: State) => ({
  authenticated: state.authenticated,
});

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(actions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
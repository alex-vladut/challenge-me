import './SideDrawer.scss';

import React from 'react';

import Close from '../../Close/Close';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
  const sideDrawerClasses = props.open ? ["SideDrawer", "Open"] : ["SideDrawer", "Close"]
  return (
    <div className={sideDrawerClasses.join(' ')}>
      <div style={{ height: '11%' }}>
        <Logo />
      </div>
      <Close onClick={props.closed} />
      <nav>
        <NavigationItems onClick={props.closed} />
      </nav>
    </div>
  )
}

export default sideDrawer;
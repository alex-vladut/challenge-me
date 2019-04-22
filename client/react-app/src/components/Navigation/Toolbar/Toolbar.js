import './Toolbar.scss';

import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className="Toolbar">
    <DrawerToggle onOpenMenu={props.onOpenMenu} />

    <Logo />
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>
)


export default toolbar;
import './Toolbar.scss';

import React, { FunctionComponent } from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

interface ToolbarProps {
  onOpenMenu(): void
}

const Toolbar: FunctionComponent<ToolbarProps> = props =>
  (<header className="Toolbar">
    <DrawerToggle onOpenMenu={props.onOpenMenu} />

    <Logo />
    <nav className="DesktopOnly">
      <NavigationItems />
    </nav>
  </header>);

export default Toolbar;
import './DrawerToggle.scss';

import React, { FunctionComponent } from 'react';

interface DrawerToggleProps {
  onOpenMenu(): void
}

const DrawerToggle: FunctionComponent<DrawerToggleProps> = props =>
  (<div onClick={props.onOpenMenu} className="DrawerToggle">
    <div></div>
    <div></div>
    <div></div>
  </div>);

export default DrawerToggle;
import React from 'react';

import './DrawerToggle.scss'

const drawerToggle = (props) => (
  <div onClick={props.onOpenMenu} className="DrawerToggle">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
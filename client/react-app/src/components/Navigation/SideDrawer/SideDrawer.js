import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Close from '../../Close/Close';

import './SideDrawer.css'

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
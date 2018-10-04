import React from 'react';

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

import './SideDrawer.css'

const sideDrawer = (props) => {
    const sideDrawerClasses = props.open ? ["SideDrawer", "Open"] : ["SideDrawer", "Close"]
    return (
        <div className={sideDrawerClasses.join(' ')}>
            <div style={{ height: '11%' }}>
                <Logo />
            </div>
            <button onClick={props.closed}>X</button>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}

export default sideDrawer;
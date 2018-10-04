import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import './NavigationItems.css'

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/" >Home</NavigationItem>
        <NavigationItem link="/challenges/new-challenge" >New Challenge</NavigationItem>
        <NavigationItem link="/challenges" >Challenges</NavigationItem>
    </ul>
)

export default navigationItems;
import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import './NavigationItems.css';

import { Auth } from 'aws-amplify';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" onClick={props.onClick} >Home</NavigationItem>
        <NavigationItem link="/challenges/new-challenge" onClick={props.onClick} >New Challenge</NavigationItem>
        <NavigationItem link="/challenges" onClick={props.onClick} >Challenges</NavigationItem>
        <NavigationItem link="/" onClick={async () => await Auth.signOut()} >Sign Out</NavigationItem>
    </ul>
)

export default navigationItems;
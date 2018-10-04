import React from 'react';
import userIcon from '../../assets/user.ico'

import './User.css';

const user = ({
    user,
    onClick
}) =>
    (<div className="User"
        onClick={() => onClick(user)}>
        <img src={userIcon} alt="logo" height="60" width="60" />
        <p>{user.firstName} {user.lastName}</p>
    </div>);

export default user;
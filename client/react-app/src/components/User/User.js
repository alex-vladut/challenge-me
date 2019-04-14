import './User.css';
import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import userIcon from '../../assets/user.ico';

const user = ({
  user,
  onClick
}) =>
  (<div className="User"
    onClick={() => onClick(user)}>
    <Grid container justify="center" alignItems="center">
      <Avatar alt={user.name} src={user.pictureUrl || userIcon} style={{ margin: '0.25rem' }} />
      <p>{user.name}</p>
    </Grid>
  </div>);

export default user;
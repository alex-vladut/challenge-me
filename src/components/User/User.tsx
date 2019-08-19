import "./User.scss";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import React, { FunctionComponent } from "react";

import userIcon from "../../assets/user.png";

interface UserProps {
  user: any;
  onClick(user: any): void;
}

const User: FunctionComponent<UserProps> = ({ user, onClick }) => (
  <div className="User" onClick={() => onClick(user)}>
    <Grid container justify="center" alignItems="center">
      <Avatar
        alt={user.name}
        src={user.pictureUrl || userIcon}
        style={{ margin: "0.25rem" }}
      />
      <p>{user.name}</p>
    </Grid>
  </div>
);

export default User;

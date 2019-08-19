import React, { FunctionComponent } from "react";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import userIcon from "../../../assets/user.png";
import Label from "../../../components/UI/Label/Label";

interface ChallengeOwnerViewProps {
  challenge: any;
}

const ChallengeOwnerView: FunctionComponent<ChallengeOwnerViewProps> = props => {
  return (
    <div>
      <p>You created this challenge.</p>
      <Label>Title:</Label>
      <p>{props.challenge.title}</p>
      <Label>Opponent:</Label>
      <Grid container>
        <Avatar alt={props.challenge.opponent.name} src={props.challenge.opponent.pictureUrl || userIcon} style={{ margin: "0.25rem" }} />
        <p>{props.challenge.opponent.name}</p>
      </Grid>
      <Label>Referee:</Label>
      <Grid container>
        <Avatar alt={props.challenge.referee.name} src={props.challenge.referee.pictureUrl || userIcon} style={{ margin: "0.25rem" }} />
        <p>{props.challenge.referee.name}</p>
      </Grid>
    </div>
  );
};

export default ChallengeOwnerView;

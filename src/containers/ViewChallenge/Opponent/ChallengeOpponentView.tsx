import React, { FunctionComponent } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import userIcon from "../../../assets/user.png";
import Label from "../../../components/UI/Label/Label";

const messages: any = {
  PENDING: "You were invited to this challenge. Accept or reject it!",
  ACCEPTED: "Great news, you already accepted this challenge!",
  REJECTED: "Looks like you rejected this challenge, sad :("
};

interface ChallengeOpponentViewProps {
  challenge: any;
  challengeAccepted(): void;
  challengeRejected(): void;
}

const ChallengeOpponentView: FunctionComponent<ChallengeOpponentViewProps> = props => {
  let controls =
    props.challenge.opponentStatus === "PENDING" ? (
      <div className="Controls">
        <Button variant="contained" color="primary" onClick={props.challengeAccepted}>
          Accept
        </Button>
        <Button variant="contained" color="secondary" onClick={props.challengeRejected}>
          Reject
        </Button>
      </div>
    ) : null;
  return (
    <div>
      <p>{messages[props.challenge.opponentStatus]}</p>
      {controls}
      <Label>Title:</Label>
      <p>{props.challenge.title}</p>
      <Label>Created by:</Label>
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

export default ChallengeOpponentView;

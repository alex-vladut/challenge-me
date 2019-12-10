import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Check, Clear } from "@material-ui/icons";
import formatDate from "date-fns/format";
import React, { FunctionComponent, useState, forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(2)
    },
    header: {
      backgroundColor: grey[200]
    },
    avatar: {
      backgroundColor: grey[500]
    },
    inline: {
      display: "inline"
    }
  })
);

export interface ParticipantsProps {
  participations: any[];
}

const Participants: FunctionComponent<ParticipantsProps> = ({ participations }) => {
  const classes = useStyles({});

  const [activeTab, setActiveTab] = useState(0);

  const going = participations.filter(p => p.status === "ACCEPTED");
  const notGoing = participations.filter(p => p.status === "REJECTED");

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs indicatorColor="primary" textColor="primary" value={activeTab} onChange={handleTabChange} centered>
        <Tab label={`Going (${going.length})`} />
        <Tab label={`Not Going (${notGoing.length})`} />
      </Tabs>
      <List className={classes.root}>
        {(activeTab === 0 ? going : notGoing).map((participation: any) => (
          <ListItem
            component={forwardRef((props: NavLinkProps, ref: any) => (
              <NavLink {...props} innerRef={ref} />
            ))}
            to={`/profiles/${participation.participant.id}`}
            key={participation.id}
            alignItems="flex-start"
            button
          >
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                alt={participation.participant.name}
                src={participation.participant.pictureUrl}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<strong>{participation.participant.name}</strong>}
              secondary={
                <>
                  <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                    {participation.status === "ACCEPTED" ? "Accepted: " : "Rejected: "}
                  </Typography>
                  {" " + formatDate(new Date(participation.createdAt), "MMMM dd")}
                </>
              }
            />
            <IconButton aria-label="participant-status" disabled={true}>
              {participation.status === "ACCEPTED" ? <Check color="primary" /> : <Clear color="error" />}
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Participants;

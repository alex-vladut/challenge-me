import React, { FunctionComponent, forwardRef } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import {
  Toolbar,
  IconButton,
  Typography,
  Popover,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Paper,
  InputBase
} from "@material-ui/core";
import {
  ArrowBackOutlined,
  MoreVert as MoreVertIcon,
  Block as BlockIcon,
  Delete as DeleteIcon,
  Send as SendIcon
} from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { timeDifference } from "../../../shared/time-difference";

const profile = {
  id: "1",
  name: "Me",
  pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
};

const conversation: any = {
  user: {
    id: "2",
    name: "Ekaterina Tankova",
    pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
  },
  messages: [
    {
      user: {
        id: "2",
        name: "Ekaterina Tankova",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text: "Hey, would you like to collaborate?",
      dateTime: "2019-12-22T16:34:19.218Z"
    },
    {
      user: {
        id: "1",
        name: "Some guy",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text:
        "Yes, sure why not. Mmasmanams asmnasma asamnasma smansmasnams mansamsasmnas amnsmasnmsana samsnamasnsmansamnasaamnmsa amsnmsanasmn",
      dateTime: "2019-12-22T16:34:19.218Z"
    }
  ]
};

const useStyles: any = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      flexDirection: "column",
      position: "relative"
    },
    statusToolbar: {
      backgroundColor: "#fff"
    },
    backButton: {
      marginRight: "1em"
    },
    name: {
      flexGrow: 1,
      flexShrink: 0
    },
    messages: {
      maxHeight: "100%",
      overflow: "hidden",
      flexGrow: 1,
      paddingTop: "1em"
    },
    scrollableArea: {
      position: "relative",
      padding: "8px 16px"
    },
    sendMessageArea: {
      display: "flex",
      alignItems: "center",
      padding: "16px",
      backgroundColor: "#fff",
      position: "fixed",
      bottom: "0",
      width: "53rem",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)"
    },
    input: {
      padding: "0.5rem 1rem",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(1),
      flexGrow: 1
    },
    message: {
      marginBottom: "1em",
      display: "flex",
      maxWidth: "500px"
    },
    messageLine: {
      display: "flex"
    },
    myMessageLine: {
      display: "flex",
      justifyContent: "flex-end"
    },
    myMessage: {
      display: "flex",
      maxWidth: "500px",
      marginBottom: "1em"
    },
    messageText: {
      color: "#263238",
      padding: "8px 16px",
      borderRadius: "6px",
      backgroundColor: "#FFFFFF"
    },
    myMessageText: {
      padding: "8px 16px",
      borderRadius: "6px",
      color: "#FFFFFF",
      backgroundColor: "#3f51b5"
    },
    avatar: {
      marginRight: "1em"
    },
    messageTextContent: {
      marginTop: "8px"
    },
    messageTime: {
      display: "flex",
      marginTop: "8px",
      justifyContent: "flex-end"
    }
  })
);

export interface ConversationProps {}

const Conversation: FunctionComponent<ConversationProps> = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div className={classes.root}>
      <Toolbar className={classes.statusToolbar}>
        <IconButton
          component={forwardRef((props: NavLinkProps, ref: any) => (
            <NavLink {...props} innerRef={ref} />
          ))}
          to="/conversations"
          aria-label="open"
        >
          <ArrowBackOutlined />
        </IconButton>
        <div className={classes.name}>
          <Typography variant="body1">
            <strong>{conversation.user.name}</strong>
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <BlockIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Block user" />
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Delete conversation" />
            </MenuItem>
          </MenuList>
        </Popover>
      </Toolbar>
      <Divider />
      <div className={classes.messages}>
        <div className={classes.scrollableArea}>
          {conversation.messages.map((message: any) => (
            <div className={message.user.id === profile.id ? classes.myMessageLine : classes.messageLine}>
              <div className={message.user.id === profile.id ? classes.myMessage : classes.message}>
                <Avatar alt={message.user.name} src={message.user.pictureUrl} className={classes.avatar} />
                <div>
                  <div className={message.user.id === profile.id ? classes.myMessageText : classes.messageText}>
                    <div>
                      <Typography>
                        <strong>{message.user.id === profile.id ? "Me" : message.user.name}</strong>
                      </Typography>
                    </div>
                    <div className={classes.messageTextContent}>
                      <Typography variant="body1" component="p">
                        {message.text}
                      </Typography>
                    </div>
                  </div>
                  <div className={classes.messageTime}>
                    <Typography variant="body2" component="p">
                      {timeDifference(new Date(message.dateTime), new Date())}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.sendMessageArea}>
        <Avatar alt={profile.name} src={profile.pictureUrl} />
        <Paper elevation={1} className={classes.input}>
          <InputBase placeholder="Leave a message..." fullWidth required />
        </Paper>
        <IconButton>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Conversation;

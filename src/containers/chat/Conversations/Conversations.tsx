import React, { FunctionComponent, useState } from "react";

import {
  Toolbar,
  InputBase,
  IconButton,
  InputAdornment,
  Divider,
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Search as SearchIcon } from "@material-ui/icons";
import formatDate from "date-fns/format";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import isToday from "date-fns/isToday";
import { timeDifference } from "../../../shared/time-difference";

const conversations: any = [
  {
    id: "1",
    user: {
      id: "123",
      name: "Adam Denisov",
      pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
    },
    lastMessage: {
      user: {
        id: "123",
        name: "Adam Denisov",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text: "OK, good bye!",
      dateTime: "2019-12-22T16:34:19.218Z"
    },
    noOfUnreadMessages: 4
  },
  {
    id: "2",
    user: {
      id: "123",
      name: "Ekaterina Tankova",
      pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
    },
    lastMessage: {
      user: {
        id: "123",
        name: "Adam Denisov",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text: "OK, good bye!",
      dateTime: "2019-12-17T17:15:19.218Z"
    }
  },
  {
    id: "3",
    user: {
      id: "123",
      name: "Adam Denisov",
      pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
    },
    lastMessage: {
      user: {
        id: "123",
        name: "Adam Denisov",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text: "OK, good bye!",
      dateTime: "2019-12-17T16:34:19.218Z"
    },
    noOfUnreadMessages: 3
  },
  {
    id: "4",
    user: {
      id: "123",
      name: "Adam Denisov",
      pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
    },
    lastMessage: {
      user: {
        id: "123",
        name: "Adam Denisov",
        pictureUrl: "https://www.gravatar.com/avatar/86c4338ba8ee11ddb11c3db560d5e72e?size=200&default=monsterid"
      },
      text: "OK, good bye!",
      dateTime: "2019-12-17T16:34:19.218Z"
    }
  }
];

const useStyles: any = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
      overflow: "hidden"
    },
    contacts: {
      borderRight: "1px solid #eeeeee",
      width: "100%",
      flexShrink: 0,
      backgroundColor: "#fff"
    },
    listItem: {
      boxShadow: "inset 4px 0px 0px #3f51b5",
      backgroundColor: "#fafafa"
    },
    lastMessageTime: {
      display: "flex",
      alignItems: "flex-end",
      marginLeft: "1rem",
      flexDirection: "column"
    },
    unreadMessages: {
      display: "inline-flex",
      flexGrow: 0,
      fontSize: "10px",
      alignItems: "center",
      backgroundColor: "rgb(244, 67, 54)",
      color: "#fff",
      height: "18px",
      padding: "2px",
      minWidth: "18px",
      marginTop: "2px",
      borderRadius: "10px",
      flexShrink: 0,
      justifyContent: "center",
      whiteSpace: "nowrap"
    }
  })
);

export interface ConversationsProps {}

const Conversations: FunctionComponent<ConversationsProps> = () => {
  const classes = useStyles();
  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const handleSearchContacts = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.contacts}>
        <Toolbar>
          <InputBase
            placeholder="Search contacts"
            fullWidth
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleSearchContacts} onMouseDown={handleSearchContacts}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Toolbar>
        <Divider />
        <List>
          {conversations.map((conversation: any) => (
            <ListItem
              divider
              button
              component="a"
              className={conversation.id === selectedConversationId ? classes.listItem : ""}
              key={conversation.id}
              onClick={() => setSelectedConversationId(conversation.id)}
            >
              <ListItemAvatar>
                <Avatar alt={conversation.user.name} src={conversation.user.pictureUrl} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography noWrap variant="h6" component="span">
                    {conversation.user.name}
                  </Typography>
                }
                secondary={
                  <Typography noWrap variant="body1" component="p">
                    {conversation.lastMessage.user.name}: {conversation.lastMessage.text}
                  </Typography>
                }
              />
              <div className={classes.lastMessageTime}>
                <Typography noWrap variant="body2" component="p">
                  {isToday(new Date(conversation.lastMessage.dateTime))
                    ? formatDate(new Date(conversation.lastMessage.dateTime), "hh:mm a")
                    : timeDifference(new Date(conversation.lastMessage.dateTime), new Date())}
                </Typography>
                {conversation.noOfUnreadMessages > 0 && (
                  <Typography className={classes.unreadMessages} variant="overline">
                    {conversation.noOfUnreadMessages}
                  </Typography>
                )}
              </div>
              <TouchRipple />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Conversations;

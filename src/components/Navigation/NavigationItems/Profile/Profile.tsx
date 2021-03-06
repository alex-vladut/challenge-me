import React, { forwardRef, FunctionComponent, useRef, useState, useEffect } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Email, ExitToApp, Person } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      marginLeft: theme.spacing(1)
    },
    paper: {}
  })
);

export interface ProfileProps {
  profile: any;
}

const Profile: FunctionComponent<ProfileProps> = ({ profile }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} size="small" className={classes.avatar}>
        <Avatar alt={profile.name} src={profile.pictureUrl} />
      </IconButton>

      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }: any) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem
                    onClick={handleClose}
                    component={forwardRef((props: NavLinkProps, ref: any) => (
                      <NavLink exact {...props} innerRef={ref} />
                    ))}
                    to="/profile"
                  >
                    <ListItemIcon>
                      <Person fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={forwardRef((props: NavLinkProps, ref: any) => (
                      <NavLink exact {...props} innerRef={ref} />
                    ))}
                    to="/contact-us"
                  >
                    <ListItemIcon>
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Contact Us" />
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    component={forwardRef((props: NavLinkProps, ref: any) => (
                      <NavLink exact {...props} innerRef={ref} />
                    ))}
                    to="/logout"
                  >
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default Profile;

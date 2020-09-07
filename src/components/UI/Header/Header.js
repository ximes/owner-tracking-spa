import React from "react";
import { Link } from "react-router-dom";

import { AppBar, Button, Drawer, Grow, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";

import EventIcon from "@material-ui/icons/Event";
import HelpIcon from "@material-ui/icons/Help";
import HomeIcon from "@material-ui/icons/Home";
import LanguageIcon from "@material-ui/icons/Language";
import LaunchIcon from "@material-ui/icons/Launch";
import MoreIcon from "@material-ui/icons/MoreVert";
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

const RouterLink = withStyles((theme) => ({
  color: "white",
}))(Link);

const HeaderButton = withStyles((theme) => ({
  root: {
    padding: theme.spacing(0, 2),
    color: theme.palette.getContrastText(red[500]),
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(0),
    backgroundColor: blueGrey[400],
  },
  grow: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(0),
    color: theme.palette.getContrastText(red[500]),
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
  
const Header = (props) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // TODO fix close drawer on click
  const DrawerLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => {
        return (
          <RouterLink
            onClick={handleDrawerToggle}
            ref={ref}
            to={props.to}
            {...linkProps}
          />
        );
      }),
    [props.to]
  );

   const drawer = (
    <div>
      <List>
        <ListItem button component={DrawerLink} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Homepage" />
        </ListItem>
        <ListItem button component={DrawerLink} to="/owners">
          <ListItemIcon>
            <PersonPinCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Motorcycles" />
        </ListItem>
        {/* TODO */}
        {/* <ListItem button component={DrawerLink} to="/events">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem> */}
        {/* TODO */}
        {/* <ListItem button component={DrawerLink} to="/account">
          <ListItemIcon>
            <LaunchIcon />
          </ListItemIcon>
          <ListItemText primary="Login / Signup" />
        </ListItem> */}
        {/* TODO */}
        {/* <ListItem button component={DrawerLink}>
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary="Language" />
        </ListItem> */}
        {/* TODO */}
        <ListItem button component={DrawerLink} to="/help">
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="fixed" className={classes.root} color="secondary">
        <Toolbar variant="dense">
          <Hidden xsDown>
            <IconButton
              edge="start"
              aria-label="Help"
              aria-haspopup="true"
              color="inherit"
              href="/"
            >
              <HomeIcon />
            </IconButton>
          </Hidden>
          <Grow in={props.showTitle}>
            <Button
              variant="text"
              color="inherit"
              className={classes.button}
              href="/"
            >
              Caponord Owners
            </Button>
          </Grow>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <HeaderButton
              variant="text"
              color="inherit"
              className={classes.button}
              startIcon={<PersonPinCircleIcon />}
              href="/owners"
            >
              Motorcycles
            </HeaderButton>
            <HeaderButton
              variant="text"
              color="inherit"
              className={classes.button}
              startIcon={<EventIcon />}
              href="/events"
            >
              Events
            </HeaderButton>
            <IconButton
              edge="start"
              aria-label="Help"
              aria-haspopup="true"
              color="inherit"
            >
              <HelpIcon />
            </IconButton>
            {/* TODO */}
            {/* <IconButton
              edge="end"
              aria-label="change language"
              aria-haspopup="true"
              color="inherit"
            >
              <LanguageIcon color="secondary" />
            </IconButton> */}
            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle color="secondary" />
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>

        <nav className={classes.drawer} aria-label="more info">
          <Hidden implementation="css">
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </AppBar>
    </div>
  );
}

export default Header;

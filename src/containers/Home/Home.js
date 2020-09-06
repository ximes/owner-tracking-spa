import React from 'react';

import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';

import AddCircleIcon from "@material-ui/icons/AddCircle";
import EventIcon from "@material-ui/icons/Event";
import HelpIcon from '@material-ui/icons/Help';
import LanguageIcon from "@material-ui/icons/Language";
import LaunchIcon from "@material-ui/icons/Launch";
import MenuIcon from "@material-ui/icons/Menu";
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import ScoreIcon from '@material-ui/icons/Score';

import FullwidthMap from '../../components/FullwidthMap/FullwidthMap';
import Actions from '../../components/Tabs/Actions/Actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const drawerWidth = 240;

const useStyles = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabPanel: {
    "& .MuiBox-root": {
      padding: "0px",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: "0px",
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "owners-tab",
      mobileOpen: false,
      motorcycles: [],
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  componentWillMount() {
    this.props.firebase.motorcycles().onSnapshot(
      function (snapshot) {
        let newMcs = [];

        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            newMcs.push(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified MC / not implemented ");
          }
          if (change.type === "removed") {
            console.log("Removed MC / not implemented ");
          }
        });
        if (newMcs.length > 0) {
          newMcs.map((mc) => this.addMc(mc));
        }
      }.bind(this)
    );
  }

  addMc = (rawData) => {
    this.setState((state, props) => {
      return {
        motorcycles: state.motorcycles.concat({
          content: {
            model: rawData["model"],
            year: rawData["year"],
            color: rawData["color"],
          },
          position: {
            lat: rawData["location"]["ef"],
            lon: rawData["location"]["nf"],
          },
        }),
      };
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { window, classes } = this.props;
    const container =
      window !== undefined ? () => window().document.body : undefined;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Container maxWidth="sm">
          <Box>
            <Typography paragraph>
              This is a registry for Caponord Owners.
            </Typography>
          </Box>
        </Container>
        <Divider />
        <List>
          <ListItem button key="add">
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText>Register yours</ListItemText>
          </ListItem>
          <ListItem button key="signup">
            <ListItemIcon>
              <LaunchIcon />
            </ListItemIcon>
            <ListItemText>Login / Signup</ListItemText>
          </ListItem>
          <ListItem button key="language">
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText>Language</ListItemText>
          </ListItem>
          <ListItem button key="language">
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText>How does it work?</ListItemText>
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Caponord Owners
            </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <AppBar position="static" color="secondary">
            <Tabs
              variant="fullWidth"
              value={this.state.activeTab}
              onChange={this.handleTabChange}
              indicatorColor="primary"
            >
              <Tab
                label="Owners"
                value="owners-tab"
                icon={<PersonPinCircleIcon />}
                id="owners-tab"
                aria-label={`simple-tab-0`}
              />
              <Tab
                label="Events"
                value="events-tab"
                icon={<EventIcon />}
                id="events-tab"
                aria-label={`simple-tab-1`}
                disabled
              />
              <Tab
                label="Stats"
                value="stats-tab"
                icon={<ScoreIcon />}
                id="stats-tab"
                aria-label={`simple-tab-2`}
                disabled
              />
            </Tabs>
          </AppBar>

          <div id="tabs" className={classes.tabPanel}>
            <TabPanel value={this.state.activeTab} index="owners-tab">
              <FullwidthMap motorcycles={this.state.motorcycles} />
              <Actions />
            </TabPanel>
            <TabPanel value={this.state.activeTab} index="events-tab">
              Events - Coming soon
            </TabPanel>
            <TabPanel value={this.state.activeTab} index="stats-tab">
              Stats - Coming soon
            </TabPanel>
          </div>
        </main>

        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home)

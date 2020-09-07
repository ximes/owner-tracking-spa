import React from 'react';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import OwnersMap from "../OwnersMap/OwnersMap";

import { withStyles } from '@material-ui/core/styles';

import { FirebaseContext } from "../../components/Firebase";
const useStyles = (theme) => ({

});

class Owners extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "owners-tab",
      mobileOpen: false
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  componentWillMount() {
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
    const { classes, ..._ } = this.props;

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
      <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <FirebaseContext.Consumer>
              {(firebase) => <OwnersMap firebase={firebase} />}
            </FirebaseContext.Consumer>
          </Grid>
          <Grid container spacing={4}>
            {cards.map((post) => (
              <div>{post}</div>
            ))}
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Owners);

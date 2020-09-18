import React from 'react';

import { Container, Grid, Link, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";

import OwnersMap from "../OwnersMap/OwnersMap";

import { FirebaseContext } from "../../components/Firebase";

const useStyles = (theme) => ({
  spacer: theme.mixins.toolbar,
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
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
        <FirebaseContext.Consumer>
          {(firebase) => <OwnersMap detailed={true} firebase={firebase} />}
        </FirebaseContext.Consumer>

        <div className={classes.spacer} />

        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            <Typography variant="h2" component="h2">
              Statistics
            </Typography>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(useStyles)(Owners);

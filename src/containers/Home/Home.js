import React from 'react';

import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import OwnersMap from "../OwnersMap/OwnersMap";
import Hero from "../../components/UI/Hero/Hero";
import GridCard from "../../components/UI/Stats/GridCard";


import { FirebaseContext } from "../../components/Firebase";

const useStyles = (theme) => ({
  spacer: theme.mixins.toolbar,
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Hero showHeaderTitleCallback={this.props.showHeaderTitleCallback} />
        <div>
          <FirebaseContext.Consumer>
            {(firebase) => <OwnersMap firebase={firebase} />}
          </FirebaseContext.Consumer>

          <div className={classes.spacer} />

          <Container className={classes.cardGrid}>
            <Grid container spacing={4}>
              <GridCard title="How old are our mcs?">
                And here we have some graph
              </GridCard>
              <GridCard title="How long did we travel?">
                Well meaning and kindly.
              </GridCard>
              <GridCard title="How many are we?" />
              <GridCard title="Where are we located?" />
            </Grid>
          </Container>

          <div className={classes.spacer} />
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(Home)

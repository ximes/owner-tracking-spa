import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import OwnersMap from "../OwnersMap/OwnersMap";
import Hero from "../../components/UI/Hero/Hero";
import ShortStats from "../Stats/ShortStats";

import { FirebaseContext } from "../../components/Firebase";

const styles = (theme) => ({
  spacer: theme.mixins.toolbar,
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Hero
          showHeaderTitleCallback={this.props.showHeaderTitleCallback}
          registrationFormOpen={this.props.registrationFormOpen}
          handleRegistrationDrawerOpen={this.props.handleRegistrationDrawerOpen}
          handleRegistrationDrawerClose={
            this.props.handleRegistrationDrawerClose
          }
        />
        <FirebaseContext.Consumer>
          {(firebase) => (
            <React.Fragment>
              <OwnersMap
                firebase={firebase}
                detailed
                handleFeedback={this.props.handleFeedback}
                registrationFormOpen={this.props.registrationFormOpen}
                handleRegistrationDrawerOpen={
                  this.props.handleRegistrationDrawerOpen
                }
                handleRegistrationDrawerClose={
                  this.props.handleRegistrationDrawerClose
                }
              />
              <div className={classes.spacer} />
              <ShortStats firebase={firebase} />
              <div className={classes.spacer} />
            </React.Fragment>
          )}
        </FirebaseContext.Consumer>
      </div>
    );
  }
}

export default withStyles(styles)(Home)

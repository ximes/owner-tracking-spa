import React from 'react';

import { Container, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import OwnersMap from "../OwnersMap/OwnersMap";
import Hero from "../../components/UI/Hero/Hero";
import GridCard from "../../components/UI/Stats/GridCard";

import { PieChart, Pie, Sector, Cell } from "recharts";

import { FirebaseContext } from "../../components/Firebase";

const styles = (theme) => ({
  spacer: theme.mixins.toolbar,
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    const DummyChart = (props) => {
      const data01 = [
        { name: "Group A", value: 400 },
        { name: "Group B", value: 300 },
        { name: "Group C", value: 300 },
        { name: "Group D", value: 200 },
      ];
      const data02 = [
        { name: "A1", value: 100 },
        { name: "A2", value: 300 },
        { name: "B1", value: 100 },
        { name: "B2", value: 80 },
        { name: "C1", value: 100 },
        { name: "D1", value: 150 },
      ];

      return (
        <PieChart width={240} height={240} >
          <Pie
            data={data01}
            dataKey="value"
            cx={120}
            cy={120}
            outerRadius={60}
            fill={props.fill1}
          />
          <Pie
            data={data02}
            dataKey="value"
            cx={120}
            cy={120}
            innerRadius={30}
            outerRadius={60}
            fill={props.fill2}
            label
          />
        </PieChart>
      );
    }

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

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
          openRegistrationModal={this.props.openRegistrationModalCallback}
        />
        <FirebaseContext.Consumer>
          {(firebase) => <OwnersMap firebase={firebase} />}
        </FirebaseContext.Consumer>

        <div className={classes.spacer} />
        <Container className={classes.cardGrid}>
          <Grid container spacing={4}>
            <GridCard title="How old are our mcs?">
              <DummyChart fill1="#8884d8" fill2="red" />
            </GridCard>
            <GridCard title="How long did we travel?">
              Well meaning and kindly.
            </GridCard>
            <GridCard title="How many are we?">
              <DummyChart fill1="blue" fill2="black" />
            </GridCard>
            <GridCard title="Where are we located?" />
          </Grid>
        </Container>
        <div className={classes.spacer} />
      </div>
    );
  }
}

export default withStyles(styles)(Home)

import React from 'react';

import { withStyles } from "@material-ui/core/styles";

import { Box, Container, Grid, Typography } from "@material-ui/core";
import GridCard from "../../components/UI/Stats/GridCard";
import { blue } from "@material-ui/core/colors";
import Loader from "../../components/UI/Loader/Loader";
import { Pie } from "react-chartjs-2";
import chroma from 'chroma-js';

const styles = (theme) => ({
  spacer: theme.mixins.toolbar,
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
});

class ShortStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mcsByYear: {},
      mcsByModel: {},
      mcsByMileage: {},
      mcCount: 0,
    };
  }

  componentDidMount() {
    this.props.firebase.motorcycles().onSnapshot(
      function (querySnapshot) {
        let allMotorcyclesByYear = {};
        let allMotorcyclesByModel = {};
        let allMotorcyclesByMileage = {};
        let mcCount = 0;

        querySnapshot.forEach(function (doc) {
          
          let year = doc.data().year;
          allMotorcyclesByYear[year] = 1 + (allMotorcyclesByYear[year] || 0);
          let mileage = doc.data().mileage;
          allMotorcyclesByMileage[mileage] = 1 + (allMotorcyclesByMileage[mileage] || 0);
          let model = doc.data().model;
          allMotorcyclesByModel[model] = 1 + (allMotorcyclesByModel[model] || 0);
          mcCount = mcCount + 1;
        });

        this.setState({
          mcsByYear: allMotorcyclesByYear,
          mcsByMileage: allMotorcyclesByMileage,
          mcsByModel: allMotorcyclesByModel,
          mcsCount: mcCount,
        });
      }.bind(this)
    );
  }

  render() {
    const { classes, theme } = this.props;

    const Chart = (props) => {
      const labels = props.labels ? props.labels.filter(({ key, _ }) => (Object.keys(props.data).includes(key))).map(({ _, value }) => (value)) : Object.keys(props.data);
      const entries = Object.keys(props.data).map((mc) => props.data[mc]);
      const colors = [...Array(entries.length)].map(
        (_, i) =>
          chroma
            .scale([
              theme.palette.primary[500],
              theme.palette.secondary[500],
              blue[500],
              blue[900],
            ])
            .colors(entries.length)[i]
      );

      const datasets = [
        {
          data: entries,
          backgroundColor: colors
        },
      ];

      return (
        <div>
          {entries.length > 0 ? (
            <Pie
              data={{ labels: labels, datasets: datasets }}
              options={{
                circumference: Math.PI,
                rotation: -Math.PI,
                cutoutPercentage: 20,
                responsive: false,
                legend: {
                  align: "start",
                  labels: {
                    boxWidth: 10,
                  },
                  fullWidth: true,
                  position: "bottom",
                },
              }}
            />
          ) : (
            <Box textAlign="center">
              <Loader />
            </Box>
          )}
        </div>
      );
    };

    return (
      <Container className={classes.cardGrid}>
        <Grid container spacing={2}>
          <GridCard title="Caponord Age">
            <Chart data={this.state.mcsByYear} />
          </GridCard>
          <GridCard title="Road behind our backs">
            <Chart
              labels={[
                { key: "1000", value: "< 1000 km" },
                { key: "25000", value: "1k-25k km" },
                { key: "50000", value: "25k-50k km" },
                { key: "75000", value: "50-75k km"},
                { key: "100000", value: "75-100k km"},
                { key: "125000", value: "100-125k km"},
                { key: "150000", value: ">150k km"}
              ]}
              data={this.state.mcsByMileage}
            />
          </GridCard>
          <GridCard title="Owners in Registry">
            <Box textAlign="center">
              <Typography variant="h1">{this.state.mcsCount}</Typography>
            </Box>
          </GridCard>
          <GridCard title="Caponord Models">
            <Chart
              labels={[
                { key: "etv", value: "1000 Base" },
                { key: "raid", value: "1000 Raid" },
                { key: "1200", value: "1200 Base" },
                { key: "tp", value: "1200 TP" },
                { key: "rally", value: "1200 Rally" },
              ]}
              data={this.state.mcsByModel}
            />
          </GridCard>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true})(ShortStats);

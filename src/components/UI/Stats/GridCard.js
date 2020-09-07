import React from "react";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import BarChartRoundedIcon from "@material-ui/icons/BarChartRounded";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(0.3),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[200],
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const GridCard = (props) => {
    const classes = useStyles();

    const icon = props.icon ? props.icon : <BarChartRoundedIcon fontSize="large" />;

    return (
      <Grid item xs={12} sm={3}>
        <Card className={classes.card}>
          <CardHeader
            avatar={ icon }
            title={props.title}
            subheader={props.subheader}
          />
          <CardContent className={classes.cardContent}>
            {props.children}
          </CardContent>
        </Card>
      </Grid>
    );
};

export default GridCard;

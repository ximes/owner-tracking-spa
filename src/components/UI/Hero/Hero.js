import React, { useState, useEffect, useRef } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ScoreIcon from "@material-ui/icons/Score";

import HeaderImage from "../../../assets/carousel/caponord-header.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
  },
  backgroundImage: {
    borderRadius: 0,
    padding: theme.spacing(10, 0),
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9)), url(${HeaderImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  featuredContent: {
    color: "#ffffff",
  },
  featuredActions: {
    paddingTop: theme.spacing(3),
  },
}));
  
const Hero = (props) => {
  const classes = useStyles();
  const heroRef = useRef();
  const [heroHeight, setHeroHeight] = useState(0);
  
  useEffect(() => { 
    setHeroHeight(heroRef.current.clientHeight); 
  });
  
  useScrollPosition(
    ({ _, currPos }) => {
      props.showHeaderTitleCallback(
        -currPos.y > ( heroHeight - 40 )
      );
    },
  );

  return (
    <div className={classes.root} ref={heroRef}>
      <Paper className={classes.backgroundImage}>
        <div className={classes.overlay} />
        <Container maxWidth="md" className={classes.featuredContent}>
          <Typography component="h2" variant="h3" align="center" gutterBottom>
            Aprilia Caponord Registry
          </Typography>
          <Typography
            variant="h5"
            align="center"
            paragraph
            styles={{ color: "white" }}
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className={classes.featuredActions}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  size="large"
                >
                  Register yours
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  href="/owners#stats"
                  size="large"
                  startIcon={<ScoreIcon />}
                >
                  Detailed stats
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Paper>
    </div>
  );
};

export default Hero;


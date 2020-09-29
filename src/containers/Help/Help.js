import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import HelpContents from "./help.en.md";

const useStyles = makeStyles((theme) => ({
  spacer: theme.mixins.toolbar,
  cardGrid: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(8),
  },
  helpContainer: {
    "& a": {
      color: 'inherit'
    }
  }
}));

export default function Help(props){
  const [contents, setContents] = useState("");
  const classes = useStyles();

  useEffect(() => {
    fetch(HelpContents).then((response) => response.text()).then((text) => {
      setContents(text)
    })
  });

  return (
    <React.Fragment>
      <div className={classes.spacer} />
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          <Grid item>
            <Typography variant="h3" component="h3">
              Help / About
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={4}>
          <Grid item>
            <ReactMarkdown escapeHtml={false} source={contents} className={classes.helpContainer} />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

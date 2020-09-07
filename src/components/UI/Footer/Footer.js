import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(0.3),
    marginTop: "auto",
    backgroundColor: blueGrey[200]
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xs">
        <Typography align="center" variant="body2" color="textSecondary">
          <Link color="inherit" href="https://caponordregistry.com/">
            ©{" "}{new Date().getFullYear()}</Link>
          {" - "}
          <Link color="inherit" to="/help#privacy">
            Privacy
          </Link>
          {" - "}
          <Link color="inherit" href="/help#credits">
            Credits
          </Link>
        </Typography>
      </Container>
    </footer>
  );};

export default Footer;

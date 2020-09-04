import React from 'react';
import { Container, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="xs">
        <Typography variant="body2" color="textSecondary">
          {"Copyright © "}
          <Link color="inherit" href="https://caponordregistry.com/">
            caponordregistry.com
          </Link>{" "}
          {new Date().getFullYear()}
          {" - "}
          <Link color="inherit" href="https://caponordregistry.com/">Privacy</Link>
          {" - "}
          <Link color="inherit" href="https://caponordregistry.com/">Credits</Link>
        </Typography>
      </Container>
    </footer>
  );};

export default Footer;

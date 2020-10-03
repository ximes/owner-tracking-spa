import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  Hidden,
  Toolbar,
  Typography,
} from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { FirebaseContext } from "../../components/Firebase";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "relative ",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1000,
  },
  paper: {
    backgroundColor: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(0),
    color: theme.palette.grey[500],
  },
}));

const OwnersMapActions = (props) => {
  const classes = useStyles();

  const formContents = (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <RegistrationForm
          firebase={firebase}
          afterSubmit={props.handleRegistrationDrawerClose}
          handleFeedback={props.handleFeedback}
        />
      )}
    </FirebaseContext.Consumer>
  );

  const closeButtonIcon = (
    <IconButton
      edge="end"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={props.handleRegistrationDrawerClose}
    >
      <CloseIcon />
    </IconButton>
  );

  const formTitle = "Register your Caponord";
  return (
    <div className={classes.root}>
      <Fab
        aria-label="Add your Caponord"
        onClick={props.handleRegistrationDrawerOpen}
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
      <Hidden mdDown implementation="js">
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={props.registrationFormOpen}
          onClose={props.handleRegistrationDrawerClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogActions className={classes.closeButton}>
            {closeButtonIcon}
          </DialogActions>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogContent>{formContents}</DialogContent>
        </Dialog>
      </Hidden>
      <Hidden mdUp implementation="js">
        <Drawer
          anchor="bottom"
          open={props.registrationFormOpen}
          onClose={props.handleRegistrationDrawerClose}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                {formTitle}
              </Typography>
              {closeButtonIcon}
            </Toolbar>
          </AppBar>
          {formContents}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default OwnersMapActions;

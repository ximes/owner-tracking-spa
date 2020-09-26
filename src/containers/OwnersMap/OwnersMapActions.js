import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Drawer, Fab, Hidden, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { FirebaseContext } from "../../components/Firebase";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';



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
  const [open, setOpen] = React.useState(false);

   const handleDrawerOpen = () => {
     setOpen(true);
   };

   const handleDrawerClose = () => {
     setOpen(false);
   };

  const formContents = (
    <FirebaseContext.Consumer>
      {(firebase) => (
        <RegistrationForm firebase={firebase} afterSubmit={handleDrawerClose} />
      )}
    </FirebaseContext.Consumer>
  );

  const closeButtonIcon = (
    <IconButton
      edge="end"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={handleDrawerClose}
    >
      <CloseIcon />
    </IconButton>
  );

  const formTitle = "Register your Caponord";
  return (
    <div className={classes.root}>
      <Fab
        aria-label="Add your Caponord"
        onClick={handleDrawerOpen}
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
      <Hidden smDown implementation="js">
        <Dialog
          fullWidth={true}
          maxWidth={"sm"}
          open={open}
          onClose={handleDrawerClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogActions className={classes.closeButton}>
            {closeButtonIcon}
          </DialogActions>
          <DialogTitle>{formTitle}</DialogTitle>
          <DialogContent>
            {formContents}
          </DialogContent>
        </Dialog>
      </Hidden>
      <Hidden smUp implementation="js">
        <Drawer anchor="bottom" open={open} onClose={handleDrawerClose}>
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

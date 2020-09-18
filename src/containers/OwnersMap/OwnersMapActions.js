import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Drawer, Fab, Fade, Hidden, Modal, Paper, AppBar, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { FirebaseContext } from "../../components/Firebase";


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';



const useStyles = makeStyles((theme) => ({
  fab: {
    position: "relative ",
    left: theme.spacing(2),
    bottom: theme.spacing(2),
    zIndex: 1000,
  },
  // modal: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
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
  const [open, setOpen] = React.useState(true);

   const handleOpen = () => {
     setOpen(true);
   };

   const handleClose = () => {
     setOpen(false);
   };

  const formContents = (
    <FirebaseContext.Consumer>
      {(firebase) => <RegistrationForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

  const closeButtonIcon = (
    <IconButton
      edge="end"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={handleClose}
    >
      <CloseIcon />
    </IconButton>
  );

  const formTitle = "Register your Caponord";
  return (
    <div className={classes.root}>
      <Fab
        aria-label="Add your Caponord"
        onClick={handleOpen}
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
          onClose={handleClose}
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
        <Drawer anchor="bottom" open={open} onClose={handleClose}>
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

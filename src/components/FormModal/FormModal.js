import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fab, Backdrop, Fade, Typography } from '@material-ui/core';
import CapoSubmitForm from '../../components/CapoSubmitForm/CapoSubmitForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function FormModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
  const [state, setState] = React.useState({
   age: "",
   name: "hai",
 });

  return (
    <div>
      <Fab
        color={props.primary ? "primary" : ""}
        aria-label="add"
        onClick={handleOpen}
        variant="extended"
      >
        {props.icon}
        <Typography variant="inherit">{props.text}</Typography>
      </Fab>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CapoSubmitForm firebase={props.firebase} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fab, Backdrop, Fade, Select, FormControl, Grid, InputLabel, Slider, TextField, Typography} from '@material-ui/core';

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

 const handleChange = (event) => {
   const name = event.target.name;
   setState({
     ...state,
     [name]: event.target.value,
   });
 };

const marks = [
  {
    value: 1000,
    label: "0km",
  },
  {
    value: 10000,
  },
  {
    value: 20000,
  },
  {
    value: 50000,
    label: "50k",
  },
  {
    value: 80000,
  },
  {
    value: 100000,
    label: "100k",
  },
  {
    value: 120000,
  },
  {
    value: 150001,
    label: "more",
  },
];

function valuetext(value) {
  return `${value}°C`;
}


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
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="mc-model">Model</InputLabel>
                <Select
                  native
                  value={state.model}
                  placeholder="Model"
                  onChange={handleChange}
                  inputProps={{
                    name: "mc-model",
                    id: "mc-model",
                  }}
                >
                  <option value={"ETV"}>ETV</option>
                  <option value={"TP"}>Travel PackP</option>
                  <option value={"Rally"}>Rally</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="mc-year">Year</InputLabel>
                <Select
                  native
                  value={state.model}
                  placeholder="Year"
                  onChange={handleChange}
                  inputProps={{
                    name: "mc-year",
                    id: "mc-year",
                  }}
                >
                  <option value={2012}>2012</option>
                  <option value={2013}>2013</option>
                  <option value={2014}>2014</option>
                  <option value={2015}>2015</option>
                  <option value={2016}>2016</option>
                  <option value={2017}>2017</option>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="mc-color">Year</InputLabel>
                <Select
                  native
                  value={state.model}
                  placeholder="color"
                  onChange={handleChange}
                  helperText="Some important text"
                  inputProps={{
                    name: "mc-color",
                    id: "mc-color",
                  }}
                >
                  <option value={"red"}>Red</option>
                  <option value={"white"}>White</option>
                  <option value={"green"}>Army Green</option>
                  <option value={"dune"}>Dune Golden</option>
                  <option value={"grey"}>Grey</option>
                  <option value={"orange"}>Orange</option>
                  <option value={"black"}>Black</option>
                  <option value={"raid"}>Raid Pattern</option>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Location"
                />
              </FormControl>
            </div>

            <div>
              <InputLabel htmlFor="mc-color">Mileage (km)</InputLabel>
              <Grid container spacing={2}>
                <Grid item xs>
                  <Slider
                    defaultValue={0}
                    aria-labelledby="discrete-slider-small-steps"
                    getAriaValueText={valuetext}
                    step={25000}
                    marks={marks}
                    min={0}
                    max={150000}
                    scale={(x) => x ** 10}
                  />
                </Grid>
              </Grid>
            </div>
            <div>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Registration"
                  placeholder="(optional)"
                />
              </FormControl>
            </div>
            <div>
              <FormControl>
                <TextField
                  id="standard-basic"
                  label="Email"
                  placeholder="(optional)"
                />
              </FormControl>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
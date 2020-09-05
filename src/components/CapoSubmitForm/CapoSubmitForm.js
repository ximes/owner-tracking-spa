import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Input, Select, FormControl, Grid, InputLabel, Slider, TextField, Typography } from '@material-ui/core';
import * as firebase from 'firebase/app';
import PropTypes from 'prop-types';

class CapoSubmitForm extends React.Component {
  state = {
    formValues: {
      model: "TP",
      year: "2017",
      registration: "ABC123",
      latitude: Math.random() * (1 + 50 - -50),
      longitude: Math.random() * (1 + 50 - -50),
      color: "white",
      mileage: 5000
    },
    isSubmitting: false
  }

  handleSubmit = event => {
    event.preventDefault();   

    let { latitude, longitude, ...mcData } = { ...this.state.formValues }

    const data = {
      uid: new Date().getTime(),
        ...mcData,
      location: new firebase.firestore.GeoPoint(this.state.formValues.latitude, this.state.formValues.longitude)
    }

    this.props.firebase
      .motorcycles()
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        console.log("debug: A new MC has been added", "Success");
      })
      .catch(error => {
        console.log(error.message, "debug: Create MC failed");
        this.setState({ isSubmitting: false });
      });
  }

  handleChange = event => {
    const name = event.target.name;
    this.setState({
      ...this.state,
      [name]: event.target.value,
    });
  };

  inputChangedHandler(event, inputIdentifier) {
    let formData = { ...this.state.orderForm };
    let touchedFormField = formData[inputIdentifier];
    touchedFormField.value = event.target.value;
    touchedFormField.touched = true;
    touchedFormField.valid = this.checkValidity(touchedFormField.value, touchedFormField.validation);

    let orderValid = true;
    for (let elId in this.state.orderForm) {
      orderValid = this.state.orderForm[elId].valid && orderValid;
    }

    this.setState({ orderForm: formData, validForm: orderValid });
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }


  render() {
    const classes = makeStyles((theme) => ({
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

    return (
      <Container>
        <form onSubmit={this.handleSubmit}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="mc-model">Model</InputLabel>
              <Select
                native
                placeholder="Model"
                onChange={this.handleChange}
                value={this.state.formValues.model}
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
                placeholder="Year"
                onChange={this.handleChange}
                value={this.state.formValues.year}
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
                placeholder="color"
                onChange={(event) => this.handleChange(event, 'color')}
                helperText="Some important text"
                value={this.state.formValues.color}
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
                id="location"
                label="Location"
              />
              <Input type='hidden' name="latitude" value={ this.state.latitude } />
              <Input type='hidden' name="longitude" value={ this.state.longitude } />
            </FormControl>
          </div>

          <div>
            <InputLabel htmlFor="mc-color">Mileage (km)</InputLabel>
            <Grid container spacing={2}>
              <Grid item xs>
                <Slider
                  defaultValue={this.state.formValues.mileage}
                  aria-labelledby="discrete-slider-small-steps"
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
                value={this.state.formValues.registration}
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
          <button type="submit"> Add </button>
        </form>
      </Container>
    );
  }
}

CapoSubmitForm.propTypes = {};

CapoSubmitForm.defaultProps = {};

export default CapoSubmitForm;
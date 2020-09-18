import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  FormHelperText,
  Grid,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import LocationSearch from "../UI/LocationSearch/LocationSearch";

import * as firebase from 'firebase/app';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '90%',
  },
  formSubmit: {
    margin: theme.spacing(3, 0),
  },
  formLocation: {
    margin: theme.spacing(2, 0),
  },
  InputLabel: {
    padding: theme.spacing(2),
  },
  colorOptionDot: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    border: "1px solid #cccccc",
    marginRight: theme.spacing(2),
  },
}));

const RegistrationForm = (props) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
      model: null,
      year: null,
      registration: null,
      latitude: Math.random() * (1 + 45 - -45),
      longitude: Math.random() * (1 + 45 - -45),
      color: null,
      mileage: 1000,
      email: null
    });

  const handleSubmit = (event) => {
    event.preventDefault();

    let { latitude, longitude, ...mcData } = { ...formValues };

    const data = {
      uid: new Date().getTime(),
      ...mcData,
      location: new firebase.firestore.GeoPoint(
        formValues.latitude,
        formValues.longitude
      ),
    };

    console.log("debug", data);
return false;
    props.firebase
      .motorcycles()
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        console.log("debug: A new MC has been added", "Success");
      })
      .catch((error) => {
        console.log(error.message, "debug: Create MC failed");
      });
    
  };

  const handleChange = (event) => {
    const name = event.target.name;
    console.log("debug", name)
    let updatedFormValues = formValues;
    updatedFormValues[name] = event.target.value;
    updatedFormValues.model = "10";
    console.log("debug", formValues);
    setFormValues(updatedFormValues);
    console.log("debug", formValues);
    console.log("debug", formValues.model);
  };

  const handleSliderChange = (event, value) => {
    setFormValues({
      ...formValues,
      mileage: value
    });
  };

  const ColorLabeledOption = ({ colorKey, colorCode, label, ...props }) => {
    const classes = useStyles();

    return (
      <MenuItem value={colorKey}>
        <Avatar
          size="small"
          className={classes.colorOptionDot}
          style={{ backgroundColor: colorCode }}
        >
          {""}
        </Avatar>
        {label}
      </MenuItem>
    );
  };
  

  const marks = [
    { value: 1000, label: "0km" },
    { value: 10000 },
    { value: 20000 },
    { value: 50000, label: "50k" },
    { value: 80000 },
    { value: 100000, label: "100k" },
    { value: 120000 },
    { value: 150001, label: "more" },
  ];

  function* yearRange(start, end, step = 1) {
    if (end === undefined) [end, start] = [start, 0];
    for (let n = start; n <= end; n += step) yield n;
  }

  const modelOptions = [
    { key: "etv", label: "ETV 1000" },
    { key: "1200", label: "Caponord 1200 Base" },
    { key: "tp", label: "Caponord 1200 Travel Pack" },
    { key: "raid", label: "ETV 1000 Raid" },
    { key: "rally", label: "Caponord 1200 Rally" },
  ].map(({ key, label }) => <MenuItem value={key}>{label}</MenuItem>);

  const colorOptions = [
    { key: "green", colorCode: "#2f4f28", label: "Army Green" },
    { key: "black", colorCode: "#000000", label: "Black" },
    { key: "golden", colorCode: "#cfb53b", label: "Dune Golden" },
    { key: "grey", colorCode: "#cccccc", label: "Grey" },
    { key: "orange", colorCode: "#fcba03", label: "Orange" },
    { key: "raid", colorCode: "#e3ab98", label: "Raid Pattern" },
    { key: "red", colorCode: "#ff0000", label: "Red" },
    { key: "white", colorCode: "#ffffff", label: "White" },
  ].map(({ key, colorCode, label }) => (
  <ColorLabeledOption colorKey={key} colorCode={colorCode} label={label} />
  ));

  const yearsOptions = Array.from(yearRange(2003, 2017)).map((year) => (
    <MenuItem value={year}>{year}</MenuItem>
  ));

  return (
    <Container>
      <form onSubmit={handleSubmit} className={classes.root} noValidate>
        <Grid container spacing={(3, 0)}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="model-label">Model</InputLabel>
              <Select
                labelId="model-label"
                placeholder="Model"
                label="Model"
                fullWidth={true}
                error={false}
                onChange={handleChange}
                inputProps={{
                  name: "model",
                  id: "model",
                }}
              >
                {modelOptions}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                labelId="year-label"
                error={false}
                label="Year"
                fullWidth={true}
                onChange={handleChange}
                inputProps={{
                  name: "year",
                  id: "year",
                }}
              >
                {yearsOptions}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                onChange={handleChange}
                error={false}
                label="Color"
                fullWidth={true}
                inputProps={{
                  name: "color",
                  id: "color",
                }}
              >
                {colorOptions}
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl
          className={clsx(classes.formControl, classes.formLocation)}
          fullWidth={true}
        >
          <LocationSearch onChange={handleChange} />
          <FormHelperText>Required</FormHelperText>
          <Input type="hidden" name="latitude" value={formValues.latitude} />
          <Input type="hidden" name="longitude" value={formValues.longitude} />
        </FormControl>

        <FormControl className={classes.formControl} fullWidth={true}>
          <Grid container spacing={2}>
            <Grid item></Grid>
            <Grid item xs>
              <Slider
                defaultValue={formValues.mileage}
                step={25000}
                marks={marks}
                min={0}
                max={150000}
                name="mileage"
                scale={(x) => x ** 10}
                onChange={handleSliderChange}
              />
            </Grid>
            <Grid item></Grid>
          </Grid>
        </FormControl>

        <TextField
          label="Registration"
          value={formValues.registration}
          placeholder="(optional)"
          inputProps={{
            name: "registration",
            id: "registration",
          }}
          onChange={handleChange}
          helperText="This value won't be shown to public"
          fullWidth={true}
        />

        <TextField
          label="Email"
          placeholder="(optional)"
          helperText="This value won't be shown to public"
          fullWidth={true}
          error={false}
          onChange={handleChange}
          value={formValues.email}
          inputProps={{
            name: "email",
            id: "email",
          }}
        />

        <FormControl
          className={clsx(classes.formControl, classes.formSubmit)}
          fullWidth={true}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </FormControl>
      </form>
    </Container>
  );
};

export default RegistrationForm;
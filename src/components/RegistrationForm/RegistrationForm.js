import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider
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
    border: "1px solid #666666",
    marginRight: theme.spacing(2),
  },
}));

const RegistrationForm = (props) => {
  const classes = useStyles();

  const [formValues, setFormValues] = useState({
    locationLatitude: undefined,
    locationLongitude: undefined,
    locationName: undefined,
    locationCountryCode: undefined,
    model: undefined,
    year: undefined,
    color: undefined,
    mileage: 1000,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let { locationLatitude, locationLongitude, ...mcData } = { ...formValues };

    const data = {
      ...mcData,
      location: new firebase.firestore.GeoPoint(
        formValues.locationLatitude,
        formValues.locationLongitude,
      ),
    };

    props.firebase
      .motorcycles()
      .add(data)
      .then((docRef) => {
        console.log(`debug: A new MC has been added`, "Success");
        props.handleFeedback({
          type: "success",
          message: `Thanks! You registered your motorcycle. Your ref. number: ${docRef.id}.`,
          open: true,
        });
        props.afterSubmit();
      })
      .catch((error) => {
        console.log(error.message, "debug: Create MC failed");
        props.handleFeedback({
          type: "error",
          message: 'Something went wrong',
          open: true,
        });
      });
  };

  const handleLocationChange = (name, lat, lng, code) => {
    setFormValues(prevValues => ({
      ...prevValues,
      locationName: name,
      locationCountryCode: code,
      locationLatitude: lat,
      locationLongitude: lng
    }));
  }

  const handleChange = (event) => {
    let prevValues = formValues;
    prevValues[event.target.name] = event.target.value;
    setFormValues(prevValues);
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
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        <Avatar
          size="small"
          className={classes.colorOptionDot}
          style={{ backgroundColor: colorCode }}
        >
          {""}
        </Avatar>
        {label}
      </div>
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
  ].map(({ key, label }) => <MenuItem key={key} value={key}>{label}</MenuItem>);

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
    <MenuItem key={key} value={key} selected={formValues === key}>
      <ColorLabeledOption colorKey={key} colorCode={colorCode} label={label} />
    </MenuItem>
  ));

  const yearsOptions = Array.from(yearRange(2003, 2017)).map((year) => (
    <MenuItem key={year} value={year}>{year}</MenuItem>
  ));

  return (
    <Container>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container spacing={(3, 0)}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="model-label">Model</InputLabel>
              <Select
                labelId="model-label"
                placeholder="Model"
                label="Model"
                fullWidth={true}
                value={formValues.model}
                error={false}
                onChange={handleChange}
                inputProps={{
                  name: "model",
                  id: "model",
                }}
              >
                <MenuItem value="">-</MenuItem>
                {modelOptions}
              </Select>
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
                value={formValues.year}
                inputProps={{
                  name: "year",
                  id: "year",
                }}
              >
                {yearsOptions}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4} md={4}>
            <FormControl required className={classes.formControl}>
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                onChange={handleChange}
                error={false}
                id="color"
                fullWidth={true}
                value={formValues.color}
                inputProps={{
                  name: "color",
                  id: "color",
                }}
              >
                {colorOptions}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <FormControl
          className={clsx(classes.formControl, classes.formLocation)}
          required
          fullWidth={true}
        >
          <input
            type="hidden"
            name="locationName"
            value={formValues.locationName}
          />
          <input
            type="hidden"
            name="locationCountryCode"
            value={formValues.locationCountryCode}
          />
          <input
            type="hidden"
            name="locationLatitude"
            value={formValues.locationLatitude}
          />
          <input
            type="hidden"
            name="locationLongitude"
            value={formValues.locationLongitude}
          />
          <LocationSearch onChange={handleLocationChange} required value={formValues.locationName} />
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

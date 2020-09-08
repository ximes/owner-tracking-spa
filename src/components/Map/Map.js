import React, { Fragment, useEffect } from 'react'
//import L from 'leaflet'
import { Map, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../UI/Loader/Loader";
import OwnerMarker from "./Owners/OwnerMarker";

// Temporarly disabled. We need to switch db for better geoquery searches
{/* <MarkerClusterGroup> */}
// import MarkerClusterGroup from "react-leaflet-markercluster";

const useStyles = makeStyles((theme) => ({
  map: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      height: "600px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxHeight: "400px",
    },
  },
}));

//todo: 
// - add continent borders
const LeafletMap = (props) => {
  const classes = useStyles();

  const centerLat = 45.55048;
  const centerLng = 12.0722;
  const defaultZoom = 3;

  const ownerMarkerList = () => {
    const items = props.items.map(({ key, ...props }) => (
      <OwnerMarker key={key} {...props} />
    ));
    return <Fragment>{items}</Fragment>;
  };

  const mapLayer = <Map
    center={[centerLat, centerLng]}
    zoom={defaultZoom}
    className={classes.map}
    minZoom={3}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
    />
    {ownerMarkerList()}
  </Map>

  return props.items ? mapLayer : <Loader />;
}

export default LeafletMap;
import React, { Fragment } from 'react'
import { Map, TileLayer } from "react-leaflet";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../UI/Loader/Loader";
import OwnerMarker from "./Markers/OwnerMarker";

// Temporarly disabled. We need to switch db for better geoquery searches
{/* <MarkerClusterGroup> */}
// import MarkerClusterGroup from "react-leaflet-markercluster";

const useStyles = makeStyles((theme) => ({
  map: {
    width: "100%",
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
    const items = props.items.map(({ key, ...itemDetails }, index) => (
      <OwnerMarker
        detailed={props.detailed}
        key={index}
        {...itemDetails}
      />
    ));
    return <Fragment>{items}</Fragment>;
  };

  const mapLayer = (
    <Map
      center={[centerLat, centerLng]}
      zoom={defaultZoom}
      className={classes.map}
      minZoom={1}
      maxZoom={8}
      style={{
        height: props.detailed ? "450px" : `${window.innerHeight / 3}px`,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />
      {ownerMarkerList(props)}
    </Map>
  );

  return props.items ? mapLayer : <Loader />;
}

export default LeafletMap;
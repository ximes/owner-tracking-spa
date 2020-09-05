import React, { Fragment } from 'react'

import L from 'leaflet'
import {
  LayersControl,
  Map,
  Marker,
  Popup,
  TileLayer,
  Tooltip
} from "react-leaflet";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const { BaseLayer } = LayersControl

const useStyles = makeStyles((theme) => ({
  map: {
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      height: "750px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxHeight: "400px",
    },
    avatarSmall: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
}));

type Position = [number, number]

type Props = {
  content: string,
  position: Position,
}

type MarkerData = { ...Props, key: string }

const MyPopupMarker = ({ content, position }: Props) => {
  const classes = useStyles(); 

    let modelInitials = '';
  switch(content.model) {
  case "Rally":
    modelInitials = "RL";
    break;
  case "TP":
    modelInitials = "TP";
    break;
  case "Raid":
    modelInitials = "RD";
    break;
  default:
    modelInitials = "-";
}
  return (
    <Marker position={position}>
      <Tooltip>
        <Avatar className={classes.avatarSmall}>{modelInitials}</Avatar>
        {content.color} {content.model} ({content.year})
      </Tooltip>
      <Popup>
        <Avatar className={classes.avatarSmall}>
          {modelInitials}
        </Avatar>
      </Popup>
    </Marker>
  );
}

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

type State = {
  markers: Array<MarkerData>,
}

const FullwidthMap = (props) => {
  const classes = useStyles();

  const state = {
    lat: 45.550480,
    lng: 12.072200,
    zoom: 3,
  }

  const position = [state.lat, state.lng]

  return props.motorcycles ? (
    <div>
      <Map
        center={[state.lat, state.lng]}
        zoom={state.zoom}
        className={classes.map}
        minZoom={3}
      >
        <LayersControl position="topright">
          <BaseLayer name="Smooth">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Toner" checked>
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>
        </LayersControl>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          zindex={0}
        />
        <Marker position={position}>
          <Tooltip>All begins here.</Tooltip>
        </Marker>
        <MyMarkersList markers={props.motorcycles} />
      </Map>
    </div>
  ) : (
    "Data is loading..."
  );
}

export default FullwidthMap;
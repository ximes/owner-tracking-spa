import React, {useRef} from 'react'
import { renderToString } from "react-dom/server";
import L from 'leaflet'
import { Marker, Popup } from "react-leaflet";

import {
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AvTimerIcon from "@material-ui/icons/AvTimer";
import DirectionsBikeIcon from "@material-ui/icons/DirectionsBike";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  xs: {
    "& .tail": {
      width: 0,
      height: 0,
      top: theme.spacing(0.1),
      left: -theme.spacing(0.6),
      position: "absolute",
      borderStyle: "solid",
      borderWidth: theme.spacing(0, 0.7, 2, 0.7),
      borderColor: "transparent transparent #cccccc transparent",
    },
    "& .avatar": {
      width: theme.spacing(3),
      height: theme.spacing(3),
      top: theme.spacing(1.5),
      left: -theme.spacing(1.5),
      fontSize: "150%",
      border: "1px solid #cccccc",
    },
    "&.red, &.red .avatar": { backgroundColor: "#ff0000" },
    "&.golden, &.golden .avatar": { backgroundColor: "#cfb53b" },
    "&.white, &.white .avatar": { backgroundColor: "#ffffff", color: "#000000" },
    "&.orange, &.orange .avatar": { backgroundColor: "#fcba03" },
    "&.black, &.black .avatar": { backgroundColor: "#000000" },
    "&.army, &.army .avatar": { backgroundColor: "#2f4f28" },
    "&.raid, &.raid .avatar": { backgroundColor: "#e3ab98", color: "#000000" },
    "&.grey, &.grey .avatar": { backgroundColor: "#cccccc"},
  },
}));

const OwnerMarker = (props) => {
  const classes = useStyles();
  const ref = useRef(null);

  let { content } = props;

  let modelInitials = "";
  switch (props.content.model) {
    case "tp":
      modelInitials = "TP";
      break;
    case "raid":
      modelInitials = "RD";
      break;
    case "rally":
      modelInitials = "RL";
      break;
    default:
      modelInitials = "-";
  }

  let colorClass = "white";

  switch (props.content.color) {
    case "raid":
      colorClass = "raid";
      break;
    case "green":
      colorClass = "green";
      break;
    case "orange":
      colorClass = "orange";
      break;
    case "red":
      colorClass = "red";
      break;
    case "golden":
      colorClass = "golden";
      break;
    case "black":
      colorClass = "black";
      break;
    case "grey":
      colorClass = "grey";
      break;
    case "white":
      colorClass = "white";
      break;
    default:
      colorClass = "white";
  }

  let TooltipModelColorAvatar = () => (
    <div className={clsx(classes.xs, colorClass)}>
      <div className="tail" />
      <Avatar className="avatar">{modelInitials}</Avatar>
    </div>
  );

  let MarkerIcon = L.divIcon({
    html: renderToString(<TooltipModelColorAvatar />),
    iconSize: 0,
    popupAnchor: [0, -5],
  }); 

  let mileage = props.content.mileage ? <ListItem>
    <ListItemAvatar>
      <Avatar className={classes.xs}>
        <AvTimerIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={`${content.mileage} km`} />
  </ListItem> : null;

  const modelLabelFor = (model) => {
    let label = "";

    switch (model) {
      case "1200":
        label = "Caponord 1200 Base";
        break;
      case "tp":
        label = "Caponord 1200 Travel Pack";
        break;
      case "raid":
        label = "ETV 1000 Raid";
        break;
      case "rally":
        label = "Caponord 1200 Rally";
        break;
      default:
        label = "ETV 1000";
    }

    return label;
  };
  
  const colorLabelFor = (color) => {
    let colorLabel = "";

    switch (color) {
      case "raid":
        colorLabel = "Raid Pattern";
        break;
      case "green":
        colorLabel = "Army Green";
        break;
      case "orange":
        colorLabel = "Orange";
        break;
      case "red":
        colorLabel = "Red";
        break;
      case "golden":
        colorLabel = "Golden";
        break;
      case "black":
        colorLabel = "Black";
        break;
      case "grey":
        colorLabel = "Ggrey";
        break;
      case "white":
        colorLabel = "White";
        break;
      default:
        colorLabel = "-";
      }

    return colorLabel;
  };


  let details = (
    <Popup>
      <List component="ul">
        <ListItem>
          <ListItemAvatar>
            <Avatar className={clsx(classes.xs, colorClass)}>
              {modelInitials}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={colorLabelFor(colorClass)} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar className={classes.xs}>
              <DirectionsBikeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            {modelLabelFor(content.model)} <Chip size="small" label={content.year} />
          </ListItemText>
        </ListItem>
        {mileage}
      </List>
    </Popup>
  );

  return (
    <Marker position={props.position} icon={MarkerIcon} ref={ref}>
      {props.detailed ? details : null}
    </Marker>
  );
};

export default OwnerMarker;

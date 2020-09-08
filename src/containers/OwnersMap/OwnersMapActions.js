import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Hidden, MenuList, MenuItem, ListItemIcon, Paper, Typography } from '@material-ui/core';
import FormModal from '../../components/FormModal/FormModal'
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import { withStyles } from "@material-ui/core/styles";
import { Fab, Zoom } from "@material-ui/core";
import Map from "../../components/Map/Map";

import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";

import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";


const useStyles = makeStyles((theme) => ({
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
    zIndex: 10000,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const actions = [{ icon: <AddIcon />, name: "Add your Caponord " }];

const OwnersMapActions = (props) => {
  const classes = useStyles();

  return (
    <div>
      {/* <Paper className={classes.root}> */}

      {/* <MenuList>
        <MenuItem>
          <ListItemIcon>
            <FormModal icon={<AddIcon />} text="Add your Caponord" primary />
          </ListItemIcon>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <FormModal icon={<SearchIcon />} text="Your submission" />
          </ListItemIcon>
        </MenuItem>
      </MenuList> */}

      {/* <Fab
        aria-label="Add your Caponord"
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab> */}
      <FormModal icon={<AddIcon />} text="Add your Caponord" primary />
      {props.children}
      {/* <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        hidden={this.state.hidden}
        icon={<SpeedDialIcon />}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        open={this.state.open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={this.handleClose}
          />
        ))}
      </SpeedDial> */}
      {/* </Paper> */}
    </div>
  );
}

export default OwnersMapActions;

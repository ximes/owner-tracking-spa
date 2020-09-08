import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {Fab, Zoom} from "@material-ui/core";
import Map from '../../components/Map/Map';


import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import SpeedDial from "@material-ui/lab/SpeedDial";
import AddIcon from "@material-ui/icons/Add";
import OwnersMapActions from "./OwnersMapActions";
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
    bottom: 0,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [{ icon: <AddIcon />, name: "Add your Caponord " }];

class OwnersMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "owners-tab",
      mobileOpen: false,
      motorcycles: [],
      hidden: false,
      open: false
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };

  componentWillMount() {
    this.props.firebase.motorcycles().onSnapshot(
      function (snapshot) {
        let newMcs = [];

        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            newMcs.push(change.doc.data());
          }
          if (change.type === "modified") {
            console.log("Modified MC / not implemented ");
          }
          if (change.type === "removed") {
            console.log("Removed MC / not implemented ");
          }
        });
        if (newMcs.length > 0) {
          this.replaceMotorcycles(newMcs);
        }
      }.bind(this)
    );
  }

  replaceMotorcycles = (rawData) => {
    let mcList = rawData.map((mc) => ({
      content: {
        model: mc["model"],
        year: mc["year"],
        color: mc["color"],
        mileage: mc["mileage"],
      },
      position: {
        lat: mc["location"]["ef"],
        lon: mc["location"]["nf"],
      },
    }));

    this.setState({motorcycles: mcList});
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };


  handleVisibility = () => {
    this.setState({hidden: !this.state.hidden});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  render() {
    const { classes, ..._ } = this.props;

    return (
      <OwnersMapActions>
        <Zoom in={true}>
          <div className={classes.root}>
            <Map items={this.state.motorcycles} />
          </div>
        </Zoom>
      </OwnersMapActions>
    );
  }
}

export default withStyles(useStyles)(OwnersMap);

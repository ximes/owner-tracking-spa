import React from 'react';
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from '@material-ui/core/styles';
import {Fade, Zoom} from "@material-ui/core";
import FullwidthMap from '../../components/FullwidthMap/FullwidthMap';
import Actions from '../../components/Tabs/Actions/Actions';


const useStyles = (theme) => ({

});

class OwnersMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "owners-tab",
      mobileOpen: false,
      motorcycles: [],
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
          newMcs.map((mc) => this.addMc(mc));
        }
      }.bind(this)
    );
  }

  addMc = (rawData) => {
    this.setState((state, props) => {
      return {
        motorcycles: state.motorcycles.concat({
          content: {
            model: rawData["model"],
            year: rawData["year"],
            color: rawData["color"],
          },
          position: {
            lat: rawData["location"]["ef"],
            lon: rawData["location"]["nf"],
          },
        }),
      };
    });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render() {
    const { classes, ..._ } = this.props;

    return (
      <Zoom in={true}>
        <div className={classes.root}>
          <CssBaseline />
          <FullwidthMap motorcycles={this.state.motorcycles} />
          {/* <Actions /> */}
        </div>
      </Zoom>
    );
  }
}

export default withStyles(useStyles)(OwnersMap);

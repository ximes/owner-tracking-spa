import React from 'react';

import { Zoom } from "@material-ui/core";
import Map from '../../components/Map/Map';
import { withStyles } from "@material-ui/core/styles";
import OwnersMapActions from "./OwnersMapActions";

const styles = (_theme) => ({
  mapContainer: {
    display: "grid",
  },
  mapLayer: {
    gridRow: 1,
    gridColumn: 1,
    alignSelf: "end",
  },
});

class OwnersMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      motorcycles: [],
    };
  }

  componentWillMount() {
    this.props.firebase.motorcycles().onSnapshot(
      function (snapshot) {
        let allMotorcycles = this.state.motorcycles;

        let toAdd = [];
        let toRemove = [];
        let toChange = [];

        snapshot.docChanges().forEach(function (change) {
          if (change.type === "added") {
            toAdd.push(change.doc.data());
          }
          if (change.type === "modified") {
            toChange.push(change.doc.data());
          }
          if (change.type === "removed") {
            toRemove.push(change.doc.data());
          }
        });

        if (toAdd.length > 0){
          toAdd.forEach(el => {
            allMotorcycles.push(this.motorcycleMapping(el));
          });
        }
        if (toRemove.length > 0) {
          toRemove.forEach((el) => {
            allMotorcycles = allMotorcycles.filter(item => (item.content.uid !== el["uid"]));
          });
        }
        if (toChange.length > 0) {
          toChange.forEach((el) => {
            let elIndex = allMotorcycles.findIndex(item => (item.content.uid === el["uid"]));
            allMotorcycles[elIndex] = this.motorcycleMapping(el);
          });
        }

        this.setState({ motorcycles: allMotorcycles });
      }.bind(this)
    );
  }

  motorcycleMapping = (mc) => {
    return {
      content: {
        uid: mc["uid"],
        model: mc["model"],
        year: mc["year"],
        color: mc["color"],
        mileage: mc["mileage"],
      },
      position: {
        lat: mc["location"]["ef"],
        lon: mc["location"]["nf"],
      },
    };
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.mapContainer}>
        <div className={classes.mapLayer}>
          <Zoom in={this.props.detailed ? true : false}>
            <Map
              items={this.state.motorcycles}
              detailed={this.props.detailed}
            />
          </Zoom>
        </div>
        <div className={classes.mapLayer}>
          <OwnersMapActions />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(OwnersMap);

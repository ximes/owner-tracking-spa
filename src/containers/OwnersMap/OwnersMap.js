import React from 'react';

import { Zoom } from "@material-ui/core";
import Map from '../../components/Map/Map';

import OwnersMapActions from "./OwnersMapActions";

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

  render() {
    const { classes, ..._ } = this.props;

    return (
      <OwnersMapActions>
        <Zoom in={true}>
          <Map items={this.state.motorcycles} />
        </Zoom>
      </OwnersMapActions>
    );
  }
}

export default OwnersMap;

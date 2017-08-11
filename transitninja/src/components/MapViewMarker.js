import React from 'react';
import MapView from 'react-native-maps';

export default class StaticMapViewMarker extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //
  //   }
  // }

  componentShouldUpdate() {
    return false;
  }

  render() {
    return (
      <MapView.Marker
        coordinate={this.props.coordinate}
        title={this.props.title}
      />
    );
  }
}

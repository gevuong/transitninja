import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import TemporaryConnection from './TemporaryConnection';
import Header from './Header';

const BUS_LOGO = require('../../assets/bus.png');

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null
    };
  }

// this is some code to customize eslint for this page.
  /*global navigator:true*/
  /*global alert:true*/
  /*global require:true*/
  /*eslint no-undef: "error"*/

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  render() {
    return (
      <View>
        <Header />
        <MapView
          style={styles.mapStyle}
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat || -36.82339,
              longitude: this.state.lastLong || -73.03569
            }}
          >
            <Image
              source={BUS_LOGO} style={styles.busIconStyle}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{
            latitude: this.state.lastLat || -36.82339,
            longitude: this.state.lastLong || -73.03569
            }}
          />
          </MapView>
          <TemporaryConnection />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: 700,
    height: 800,
    backgroundColor: 'skyblue'
  },
  busIconStyle: {
    width: 15,
    height: 15
  }
});

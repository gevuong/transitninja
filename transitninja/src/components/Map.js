import axios from 'axios';
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
import TemporaryConnection from './TemporaryConnection';
import Header from './Header';

// const BUS_LOGO = require('../../assets/bus.png');
const BUS_STOP_LOGO = require('../../assets/bus_stop.png');

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      muni_stops: [],
      actransit_stops: []
    };
  }

// this is some code to customize eslint for this page.
  /*global navigator:true*/
  /*global alert:true*/
  /*global require:true*/
  /*eslint no-undef: "error"*/

  componentWillMount() {
    axios.get('http://localhost:3000/api/muniStations').then(response => {
      this.setState({ muni_stops: response.data });
    });
    axios.get('http://localhost:3000/api/actransitStations').then(response => {
      console.log('this is getting hit');
      this.setState({ actransit_stops: response.data });
    });
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00322,
          longitudeDelta: 0.00121
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

  _renderMuni(){

  }

  _renderACTransit(){
    
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Header />
        <MapView
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.mapStyle}
        >
          {this.state.muni_stops.map(stop => (
            <MapView.Marker
              coordinate={{
                latitude: stop.stop_lat || -36.82339,
                longitude: stop.stop_lon || -73.03569
              }}
              title={stop.stop_name}
              key={stop.stop_id}
            >
            <Image
              source={BUS_STOP_LOGO} style={styles.busIconStyle}
            />
            </MapView.Marker>
          ))}
          {this.state.actransit_stops.map(stop => (
            <MapView.Marker
              coordinate={{
                latitude: stop.stop_lat || -36.82339,
                longitude: stop.stop_lon || -73.03569
              }}
              title={stop.stop_name}
              key={stop.stop_id}
              pinColor={'#000000'}
            />
          ))}
          </MapView>
          <TemporaryConnection />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch'
  },
  mapStyle: {
    flex: 1
  },
  busIconStyle: {
    width: 15,
    height: 15
  }
});

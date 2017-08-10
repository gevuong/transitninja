import axios from 'axios';
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
      lastLong: null,
      muni_stops: []
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
  }

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
          {this.state.muni_stops.map(stop => (
            <MapView.Marker
              coordinate={{
                latitude: stop.stop_lat || -36.82339,
                longitude: stop.stop_lon || -73.03569
              }}
              title={stop.stop_name}
              key={stop.stop_id}
            />
          ))}
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
//
// example stops:
// {"__v":0,"stop_id":913,"stop_name":"DUBLIN ST & LAGRANDE AVE","stop_desc":0,"stop_lat":37.719192,"stop_lon":-122.425802,"zone_id":0,"stop_url":"","_id":"598bff78cb3351601e41b5de"},
// {"__v":0,"stop_id":3003,"stop_name":"2nd St & Brannan St   ","stop_desc":0,"stop_lat":37.781827,"stop_lon":-122.391945,"zone_id":0,"stop_url":"","_id":"598bff78cb3351601e41b5df"},
// {"__v":0,"stop_id":3004,"stop_name":"2nd St & Brannan St","stop_desc":0,"stop_lat":37.781854,"stop_lon":-122.392232,"zone_id":0,"stop_url":"","_id":"598bff78cb3351601e41b5e0"},

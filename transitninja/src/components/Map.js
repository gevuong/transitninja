import axios from 'axios';
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
// import Header from './Header';
import Button from 'react-native-button';

const BUS_LOGO = require('../../assets/bus.png');
const BUS_STOP_RED = require('../../assets/Bus_Stop_Red.png');
const BUS_STOP_GREEN = require('../../assets/Bus_Stop_Green.png');

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      muni_stops: [],
      actransit_stops: [],
      showACTransit: true,
      showMuni: true,
      actransit_busses: [],
      muni_busses: []
    };
    this.toggleMuni = this.toggleMuni.bind(this);
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
      this.setState({ actransit_stops: response.data });
    });
    axios.get('http://localhost:3000/api/actransitBusses').then(response => {
      this.setState({ actransit_busses: response.data });
    });
    axios.get('http://localhost:3000/api/muniBusses').then(response => {
      this.setState({ muni_busses: response.data });
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

  toggleMuni() {
    console.log('Button clicked');
    this.setState({
      showMuni: !this.state.showMuni
    });
  }

  renderMuni() {
    // return this.state.muni_stops.map(stop => (
    //   <MapView.Marker
    //     coordinate={{
    //       latitude: stop.stop_lat || -36.82339,
    //       longitude: stop.stop_lon || -73.03569
    //     }}
    //     title={stop.stop_name}
    //     key={stop.stop_id}
    //   >
    //   <Image source={BUS_STOP_RED} style={styles.busIconStyle} />
    //   </MapView.Marker>
    // ));
    return this.state.muni_busses.map(bus => (
      <MapView.Marker
        coordinate={{
          latitude: bus.lat || -36.82339,
          longitude: bus.lon || -73.03569
        }}
        title={bus.trip_id}
        key={bus.id}
      >
      <Image source={BUS_LOGO} style={styles.busIconStyle}/>
      </MapView.Marker>
    ));
  }

  renderACTransit() {
    // return this.state.actransit_stops.map(stop => (
    //   <MapView.Marker
    //     coordinate={{
    //       latitude: stop.stop_lat || -36.82339,
    //       longitude: stop.stop_lon || -73.03569
    //     }}
    //     title={stop.stop_name}
    //     key={stop.stop_id}
    //   >
    //     <Image source={BUS_STOP_GREEN} style={styles.busIconStyle} />
    //   </MapView.Marker>
    // ));
    return this.state.actransit_busses.map(bus => (
      <MapView.Marker
        coordinate={{
          latitude: bus.lat || -36.82339,
          longitude: bus.lon || -73.03569
        }}
        title={bus.trip_id}
        key={bus.id}
      >
      <Image source={BUS_STOP_GREEN} style={styles.busIconStyle}/>
      </MapView.Marker>
    ));
  }

  render() {
    console.log(this.state);
    // <Header />
    return (
      <View style={styles.viewStyle}>
        <MapView
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.mapStyle}
        >
        <Button
          containerStyle={{ height: 35, padding: 10, borderRadius: 10, backgroundColor: 'white' }}
          style={{ fontSize: 20, color: 'red' }}
          onPress={this.toggleMuni}
        >I am a Button
        </Button>
        {this.state.showMuni ? this.renderMuni() : null }
        {this.state.showACTransit ? this.renderACTransit() : null }
        </MapView>
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

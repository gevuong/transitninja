import axios from 'axios';
import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView from 'react-native-maps';
// import Header from './Header';
// import Button from 'react-native-button';
import Polyline from '@mapbox/polyline';
import fetch from 'isomorphic-fetch';
import SearchBar from 'react-native-searchbar';
import TemporaryConnection from './TemporaryConnection';
// const BUS_LOGO = require('../../assets/bus.png');
const BUS_STOP_RED = require('../../assets/Bus_Stop_Red.png');
const BUS_STOP_GREEN = require('../../assets/Bus_Stop_Green.png');


// const startLoc = 'sanjose';
// const endLoc = 'sanfrancisco';
export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      muni_stops: [],
      actransit_stops: [],
      bart_stops: [],
      caltrain_stops: [],
      showACTransit: true,
      showMuni: true,
      showBart: true,
      showCaltrain: true,
      latitude: '',
      longitude: '',
    startLoc: 'sanjose',
    endLoc: '',
    coordo: [],
    res: '',
    active: false
    };
    this.toggleMuni = this.toggleMuni.bind(this);
    this.getDirections = this.getDirections.bind(this);
    // this.renderPol = this.renderPol.bind(this);
    // this.parser = this.parser.bind(this);
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
    axios.get('http://localhost:3000/api/bartStations').then(response => {
      this.setState({ bart_stops: response.data });
    });
    axios.get('http://localhost:3000/api/caltrainStations').then(response => {
      this.setState({ caltrain_stops: response.data });
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
    // this.getDirections();
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

  async getDirections() {
      console.log('hit');
      try {
        // fetch directions from google.
        const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${this.state.startLoc}&destination=${this.state.endLoc}`);
        const respJson = await resp.json();
        console.log(respJson);
        // decode encoded polyline data.
        const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        // converts polyline data into a list of objects
        const coords = points.map((point) => {
          return { latitude: point[0], longitude: point[1] };
        });
        this.setState({ coordo: coords });
        console.log(this.state.coordo);
        return coords;
      } catch (error) {
        return error;
      }
    }

  toggleMuni() {
    console.log('Button clicked');
    this.setState({
      showMuni: !this.state.showMuni
    });
  }

  // parser(locations) {
  //   const str = [];
  //   const o = locations.split(' ');
  //   o.forEach(letter => (
  //     str.push(letter.toString())
  //   ));
  //   return str.join(' ');
  // }

  renderMuni() {
    return this.state.muni_stops.map(stop => (
      <MapView.Marker
        coordinate={{
          latitude: stop.stop_lat || -36.82339,
          longitude: stop.stop_lon || -73.03569
        }}
        title={stop.stop_name}
        key={stop.stop_id}
      >
      <Image source={BUS_STOP_RED} style={styles.busIconStyle} />
      </MapView.Marker>
    ));
  }

  renderACTransit() {
    return this.state.actransit_stops.map(stop => (
      <MapView.Marker
        coordinate={{
          latitude: stop.stop_lat || -36.82339,
          longitude: stop.stop_lon || -73.03569
        }}
        title={stop.stop_name}
        key={stop.stop_id}
      >
        <Image source={BUS_STOP_GREEN} style={styles.busIconStyle} />
      </MapView.Marker>
    ));
  }

  renderBart() {
    return this.state.bart_stops.map(stop => (
      <MapView.Marker
        coordinate={{
          latitude: stop.stop_lat || -36.82339,
          longitude: stop.stop_lon || -73.03569
        }}
        title={stop.stop_name}
        key={stop.stop_id}
      >
        <Image source={BUS_STOP_GREEN} style={styles.busIconStyle} />
      </MapView.Marker>
    ));
  }

  renderCaltrain() {
    return this.state.caltrain_stops.map(stop => (
      <MapView.Marker
        coordinate={{
          latitude: stop.stop_lat || -36.82339,
          longitude: stop.stop_lon || -73.03569
        }}
        title={stop.stop_name}
        key={stop.stop_id}
      >
        <Image source={BUS_STOP_GREEN} style={styles.busIconStyle} />
      </MapView.Marker>
    ));
  }

  renderPol() {
    console.log(this.state.startLoc);
      console.log(this.state.endLoc);
    return (
    <MapView.Polyline
       coordinates={this.state.coordo}
       strokeWidth={5}
       strokeColor="green"
    />
  );
  }

  renderer() {

  }

  // {this.state.muni_stops.map(stop => (
  //   <MapView.Marker
  //     coordinate={{
  //       latitude: stop.stop_lat || -36.82339,
  //       longitude: stop.stop_lon || -73.03569
  //     }}
  //     title={stop.stop_name}
  //     key={stop.stop_id}
  //
  //   />
  // ))}
  //
  // {this.state.actransit_stops.map(stop => (
  //   <MapView.Marker
  //     coordinate={{
  //       latitude: stop.stop_lat || -36.82339,
  //       longitude: stop.stop_lon || -73.03569
  //     }}
  //     title={stop.stop_name}
  //     key={stop.stop_id}
  //     pinColor={'#000000'}
  //
  //   />
  // ))}
  //
  // {this.state.bart_stops.map(stop => (
  //   <MapView.Marker
  //     coordinate={{
  //       latitude: stop.stop_lat || -36.82339,
  //       longitude: stop.stop_lon || -73.03569
  //     }}
  //     title={stop.stop_name}
  //     key={stop.stop_id}
  //     pinColor={'#3498DB'}
  //   />
  // ))}
  //
  // {this.state.caltrain_stops.map(stop => (
  //   <MapView.Marker
  //     coordinate={{
  //       latitude: stop.stop_lat || -36.82339,
  //       longitude: stop.stop_lon || -73.03569
  //     }}
  //     title={stop.stop_name}
  //     key={stop.stop_id}
  //     pinColor={'#F7DC6F'}
  //   />
  // ))}
  //
  // <MapView.Marker
  //   coordinate={{
  //     latitude: this.state.lastLat || -36.82339,
  //     longitude: this.state.lastLong || -73.03569
  //   }}
  // >
  //   <Image
  //     source={BUS_STOP_RED} style={styles.busIconStyle}
  //   />
  // </MapView.Marker>
  // <MapView.Marker
  //   coordinate={{
  //   latitude: this.state.lastLat || -36.82339,
  //   longitude: this.state.lastLong || -73.03569
  //   }}
  // />


  render() {
    // <Header />
    const x = true;
    const y = false;
    // console.log(this.state);
    return (
      <View style={styles.viewStyle}>
        <View id='second' style={[styles.secondBar]}>
          <SearchBar
            ref={(ref) => { this.searchBar = ref; }}
            data={['sanjose, sanfrancisco']}
            handleResults={this.logger}
            showOnLoad={x}
            placeholder='Current location'
            iOSHideShadow={x}
            hideBack={x}
            textColor={'#FF0000'}
            handleChangeText={(e) => this.setState({ startLoc: e })}
            onSubmitEditing={() => this.getDirections().then(this.renderPol())}
          />
        </View>

        <View id='first' style={styles.firstBar}>
          <SearchBar
            ref={(ref) => { this.searchBar = ref; }}
            placeholder='Destination'
            data={['sanjose, sanfrancisco']}
            handleResults={this.logger}
            showOnLoad
            onFocus={() => console.log('hitting this son')}
            onBlur={() => this.setState({ active: false })}
            hideBack={x}
            iOSHideShadow={x}
            textColor={'#FF0000'}
            handleChangeText={(e) => this.setState({ endLoc: e })}
            onSubmitEditing={() => this.getDirections().then(this.renderPol())}
          />
        </View>

        <MapView
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.mapStyle}
        >

        {this.renderPol()}

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
  },
  firstBar: {
    flex: 0.15
  },
  secondBar: {
    flex: 0.15
  },
  hide: {
    flex: 0
  }
});

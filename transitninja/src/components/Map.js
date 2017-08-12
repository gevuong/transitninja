import axios from 'axios';
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

import Polyline from '@mapbox/polyline';
import ToggleButton from './ToggleButton';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Search from './Search';

const BUS_LOGO_GREEN = require('../../assets/bus_icon_green.png');
const BUS_LOGO_RED = require('../../assets/bus_icon_red.png');
const AC_TRANSIT_LOGO = require('../../assets/ac_transit_logo.png');
const PIN_SHOW = require('../../assets/pin_show_orange.png');
const HAMBURGER = require('../../assets/hamburger.png');

const startLoc = 'sanjose';
const endLoc = 'sanfrancisco';

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      muni_stops: [],
      actransit_stops: [],
      muni_busses: [],
      bart_stops: [],
      caltrain_stops: [],
      actransit_busses: [],
      showACTransit: true,
      showMuni: true,
      showBart: true,
      showCaltrain: true,
      latitude: '',
      longitude: '',
    destination: '',
    coordo: [],
    res: ''

    };
    this.toggleMuni = this.toggleMuni.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.toggleACTransit = this.toggleACTransit.bind(this);
    this.renderACTransitBusses = this.renderACTransitBusses.bind(this);
  }


// this is some code to customize eslint for this page.
  /*global navigator:true*/
  /*global alert:true*/
  /*global require:true*/
  /*eslint no-undef: "error"*/
  componentWillMount() {
    this.makeAxiosRequests();
  }

  makeAxiosRequests() {
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
          latitudeDelta: 0.00322 * 2.5,
          longitudeDelta: 0.00121 * 2.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.timer = setTimeout(() => {
      console.log('I do not leak!');
    }, 5000);
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearTimeout(this.timer);
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  async getDirections() {
    try {
      // fetch directions from google.
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}`);
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
    this.setState({
      showMuni: !this.state.showMuni
    });
  }

  toggleACTransit() {
    this.setState({
      showACTransit: !this.state.showACTransit
    });
  }

  renderACTransitBusses() {

    // return this.state.actransit_busses.map(bus => (
    //   <MapView.Marker
    //     coordinate={{
    //       latitude: bus.lat + 0.000060 || -36.82339,
    //       longitude: bus.lon || -73.03569
    //     }}
    //     title={bus.trip_id}
    //     key={bus.id}
    //   >
    //     <Image source={BUS_LOGO_GREEN} />
    //   </MapView.Marker>
    // ));
  }

  renderMuniBusses() {
    return this.state.muni_busses.map(bus => (
      <MapView.Marker
        coordinate={{
          latitude: bus.lat + 0.000060 || -36.82339,
          longitude: bus.lon || -73.03569
        }}
        title={bus.trip_id}
        key={bus.id}
      >
        <Image source={BUS_LOGO_RED} />
      </MapView.Marker>
    ));
  }


  openSearchModal() {
   RNGooglePlaces.openAutocompleteModal()
   .then((place) => {
       console.log(place);
       // place represents user's selection from the
       // suggestions and it is a simplified Google Place object.
   })
   .catch(error => console.log(error.message));  // error is a Javascript Error object
 }


// note that I removed onRegionChange from the MapView props. This will speed up our app a bit. But if we WANT to update the mapRegion whenever we move the map around, then we'll need to put i back in.


  render() {
    return (
      <View style={styles.viewStyle}>
        <Search
          ref={(ref) => { this.searchBar = ref; }}
          data={['sanjose, sanfrancisco']}
          handleResults={this.logger}
          showOnLoad
          placeholder="Where To?"
          hideBack
          textColor={'black'}
          handleChangeText={(e) => this.setState({ destination: e })}
          onSubmitEditing={() => this.getDirections().then(this.renderPol())}
          />
      <View style={styles.hamburger}>
        <TouchableOpacity onPress={() => Actions.modal()}>
          <Image source={HAMBURGER} />
        </TouchableOpacity>
      </View>
        <MapView
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          style={styles.mapStyle}
        >
        { this.state.showACTransit ? this.renderACTransitBusses() : null }
        { this.state.showMuni ? this.renderMuniBusses() : null }
        </MapView>
        <View style={styles.buttonView}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'rgba(255, 0, 0, 0)'}
            onPress={this.toggleMuni}
            style={this.state.showMuni ? styles.buttonPress : styles.button}
          >
            <View>
              <ToggleButton
                logo={PIN_SHOW}
                text={'SF Muni'}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'rgba(255, 0, 0, 0)'}
            onPress={this.toggleACTransit}
            style={this.state.showACTransit ? styles.buttonPress : styles.button}
          >
            <View>
              <ToggleButton
                logo={PIN_SHOW}
                text={'AC Transit'}
              />
            </View>
          </TouchableHighlight>
          <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.openSearchModal()}
        >
          <Text>Pick a Place</Text>
        </TouchableOpacity>
      </View>
        </View>
      </View>
    );
  }
}
// {this.state.showACTransit ? this.renderACTransit() : null }
// {this.state.showMuni ? this.renderMuni() : null }

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch'
  },
  hamburger: {
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    marginTop: 55,
    marginLeft: 335
  },
  mapStyle: {
    flex: 1
  },
  buttonView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 20,
    top: 580,
    left: 50,
    right: 50
  },
  buttonPress: {
    opacity: 0.5
  },
  button: {
    opacity: 1
  }
});

// $link-color-nav: #353535;
// $dark-medium-gray: rgb(62, 62, 62);
// $medium-gray: #797979;
// $light-gray: #A1A1A1;
// $lighter-gray: #e9e9e9;
// $lightest-gray: rgb(244, 244, 244);
// $green: #2BDE73;
// $off-white: #f2f2f2;

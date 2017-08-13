import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, ScrollView, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';

import Polyline from '@mapbox/polyline';
import ToggleButton from './ToggleButton';
import Search from './Search';

const BUS_LOGO_GREEN = require('../../assets/bus_icon_green.png');
const BUS_LOGO_RED = require('../../assets/bus_icon_red.png');
const PIN_SHOW = require('../../assets/pin_show_orange.png');
const HAMBURGER = require('../../assets/hamburger.png');

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deltalat: null,
      deltalon: null,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      userLat: null,
      userLong: null,
      muni_stops: [],
      actransit_stops: [],
      muni_busses: [],
      bart_stops: [],
      caltrain_stops: [],
      actransit_busses: [],
      showACTransit: false,
      showMuni: false,
      showBart: true,
      showCaltrain: true,
      latitude: '',
      longitude: '',
      destination: {},
      coordo: [],
      res: '',
      predictions: [],
      isPickerVisible: false,
      renderPol: false,
      mapcenter: false
    };
    this.toggleMuni = this.toggleMuni.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.toggleACTransit = this.toggleACTransit.bind(this);
    this.renderACTransitBusses = this.renderACTransitBusses.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);
    this.makeAxiosRequests = this.makeAxiosRequests.bind(this);
    this.renderMuniBusses = this.renderMuniBusses.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.renderPol = this.renderPol.bind(this);
    this.togglePol = this.togglePol.bind(this);
    this.resetMap = this.resetMap.bind(this);
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
        this.setState({ actransit_busses: response.data.map(bus => (
          <MapView.Marker
            coordinate={{
              latitude: bus.lat + 0.000060 || -36.82339,
              longitude: bus.lon || -73.03569
            }}
            title={bus.trip_id}
            key={bus.id}
          >
            <Image source={BUS_LOGO_GREEN} />
          </MapView.Marker>
        )) });
      });

      axios.get('http://localhost:3000/api/muniBusses').then(response => {
        this.setState({ muni_busses: response.data.map(bus => (
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
        )
        )
      });
    });
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          userLat: position.coords.latitude,
          userLong: position.coords.longitude
        });
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.00322 * 2.5,
          longitudeDelta: 0.00121 * 2.5
        };
        this.setState({deltalat: region.latitudeDelta, deltalon: region.longitudeDelta});
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.timer = setTimeout(() => {
      console.log('I do not leak!');
    }, 5000);
    setInterval(() => {
      this.makeAxiosRequests();
    }, 60000);
  }

// this saves us some performance. It won't re-render everything when we move around the map.
  shouldComponentUpdate(nextProps, nextState) {
    if (

      this.state.lastLat !== nextState.lastLat ||
      this.state.lastLong !== nextState.lastLong) {
        return false;
      }
    return true;
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    clearTimeout(this.timer);
  }

  onRegionChange(region, lastLat, lastLong) {
    console.log('region', region);
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  async getDirections(destination) {
    try {
      // fetch directions from google.
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${`${this.state.userLat},${this.state.userLong}`}&destination=${destination.address}&mode=transit`);
      const respJson = await resp.json();
      console.log(respJson);
      // decode encoded polyline data.
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      // converts polyline data into a list of objects
      const coords = points.map((point) => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({ coordo: coords });
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

  renderMuniBusses() {
    return this.state.muni_busses;
  }

  renderACTransitBusses() {
    return this.state.actransit_busses;
  }

  resetMap() {
    console.log('hitta');
    this.setState({
      mapRegion: { latitude: this.state.userLat, longitude: this.state.userLong, latitudeDelta: this.state.deltalat, longitudeDelta: this.state.deltalon},
      lastLat: this.state.lastLat,
      lastLong: this.state.lastLong

    });
  }

  openSearchModal() {
    RNGooglePlaces.openAutocompleteModal(
      {
        latitude: this.state.lastLat,
        longitude: this.state.lastLong,
        radius: 200
      }
    )
    .then((place) => {
      this.setState({ destination: place });
      // place represents user's selection from the
      // suggestions and it is a simplified Google Place object.
      //  we will set destination equal to place.address.
      this.getDirections(place.address).then(this.togglePol());
      // this.renderPol();
    })
   .catch(error => console.log(error.message));  // error is a Javascript Error object
 }

 togglePol() {
   this.setState({ renderPol: true });
 }

 renderEndLocation() {
   return (
     <MapView.Marker
       coordinate={{
       latitude: this.state.destination.latitude || -36.82339,
       longitude: this.state.destination.longitude || -36.82339
       }}
       title={this.state.destinationname || 'temp'}
     />
   );
 }

// note that I removed onRegionChange from the MapView props.
// This will speed up our app a bit. But if we WANT to update the mapRegion
// whenever we move the map around, then we'll need to put i back in.

  renderPol() {
    // console.log('coordinates', this.state.coordo);
    return (
    <MapView.Polyline
      lineCap='round'
      lineJoin='round'
      coordinates={this.state.coordo}
      strokeWidth={7}
      strokeColor='#00997a'
    />
  );
  }


  render() {
    return (
      <View style={styles.viewStyle}>
        <Search
          ref={(ref) => { this.searchBar = ref; }}
          data={['sanjose, sanfrancisco']}
          handleResults={this.logger}
          onFocus={this.openSearchModal}
          focusOnLayout={false}
          showOnLoad
          placeholder="Where To?"
          hideBack
          textColor={'black'}
        />
      <View style={styles.hamburger}>
        <TouchableOpacity onPress={() => Actions.modal()}>
          <Image source={HAMBURGER} />
        </TouchableOpacity>
      </View>
        <MapView
          region={this.state.mapRegion}
          loadingBackgroundColor='#e6f7ff'
          loadingEnabled
          loadingIndicatorColor='#ffffff'
          onRegionChangeComplete={this.onRegionChange}
          showsUserLocation
          showsCompass
          style={styles.mapStyle}
        >
        { this.state.showACTransit ? this.renderACTransitBusses() : null }
        { this.state.showMuni ? this.renderMuniBusses() : null }
        { this.renderPol ? this.renderPol() : null }
        { this.renderPol ? this.renderEndLocation() : null }

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

          <TouchableHighlight
            activeOpacity={1}
            underlayColor={'rgba(255, 0, 0, 0)'}
            onPress={this.resetMap}
            style={this.state.showACTransit ? styles.buttonPress : styles.button}
          >
            <View>
              <ToggleButton
                logo={PIN_SHOW}
                text={'Recenter'}
              />
            </View>
          </TouchableHighlight>
          </View>

      </View>
    );
  }
}

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
  }, voo: {

  },
  buttonView: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'space-around',
    bottom: 100,
    top: 400,
    left: 300,
    right: 50,
    height: 220
  },
  buttonPress: {
    opacity: 0.5
  },
  button: {
    opacity: 1
  },
  modalStyle: {
    height: 100,
    marginTop: 50,
    backgroundColor: 'white'
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

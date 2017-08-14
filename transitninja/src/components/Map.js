import axios from 'axios';
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { ScrollView, View, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Text, Button, Dimensions, AlertIOS } from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import SlidingUpPanel from 'react-native-sliding-up-panel';

import Polyline from '@mapbox/polyline';
import ToggleButton from './ToggleButton';
import Search from './Search';
import HandlerOne from './HandlerOne';

const RECENTER_LOGO = require('../../assets/recenter.png');
const BUS_LOGO_GREEN = require('../../assets/bus_icon_green.png');
const BUS_LOGO_RED = require('../../assets/bus_icon_red.png');
const PIN_SHOW = require('../../assets/pin_show_orange.png');
const PIN_SHOW_GREEN = require('../../assets/pin_show_green.png');
const HAMBURGER = require('../../assets/hamburger.png');
const BUS = require('../../assets/bus.png');
const WALK = require('../../assets/walk_icon.png');
const SEARCHER = require('../../assets/show_icon.png');
var deviceHeight = Dimensions.get('window').height;

var MAXIMUM_HEIGHT = deviceHeight - 100;
var MINUMUM_HEIGHT = 80;

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ok: false,
      opsRegion: null,
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

      showACTransit: true,
      showMuni: true,
      showBart: true,
      showCaltrain: true,

      showSlidingPanel: false,
      updateHandlerOne: false,
      latitude: '',
      longitude: '',
      destination: {},
      coordo: [],
      res: '',
      predictions: [],
      renderPol: false,
      containerHeight: 0,
      zoomer: false,
      directions: {
        routes: [{
            legs: [{
              arrival_time: {
                text: ''
              },
              distance: {
                text: ''
              },
              duration: {
                text: ''
              },
              end_address: '',
              end_location: {
                lat: '',
                lng: ''
              },
              start_location: {
                lat: '',
                lng: ''
              },
              steps: [{
                duration: {
                  text: ''
                },
                distance: {
                  text: ''
                },
                html_instructions: '',
                travel_mode: ''
              }]
            }]
        }]
      }
    };
    this.searching = this.searching.bind(this);
    this.toggleMuni = this.toggleMuni.bind(this);
    this.getDirections = this.getDirections.bind(this);
    this.toggleACTransit = this.toggleACTransit.bind(this);
    this.renderACTransitBusses = this.renderACTransitBusses.bind(this);
    this.openSearchModal = this.openSearchModal.bind(this);
    this.makeAxiosRequests = this.makeAxiosRequests.bind(this);
    this.renderMuniBusses = this.renderMuniBusses.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.renderPol = this.renderPol.bind(this);
    this.renderSlidingPanel = this.renderSlidingPanel.bind(this);
    // this.updateHandlerOne = this.updateHandlerOne.bind(this);
    this.togglePol = this.togglePol.bind(this);
    this.resetMap = this.resetMap.bind(this);
    this.zoomRoute = this.zoomRoute.bind(this);
    this.toggleZoom = this.toggleZoom.bind(this);
    console.disableYellowBox = true;
  }

// checker(){
//   if(this.state.mapRegion === this.state.opsRegion ){
//     this.setState({ok: true});
//   }else{
//     this.setState({ok: false});
//   }
// }

// this is some code to customize eslint for this page.
  /*global navigator:true*/
  /*global alert:true*/
  /*global require:true*/
  /*eslint no-undef: "error"*/
  componentWillMount() {
    this.makeAxiosRequests();
    console.log('willMount', this.state);
  }

  makeAxiosRequests() {
      axios.get('https://transitninja.herokuapp.com/api/actransitBusses').then(response => {
        this.setState({ actransit_busses: response.data.map(bus => (
          <MapView.Marker
            coordinate={{
              latitude: bus.lat + 0.000060 || -36.82339,
              longitude: bus.lon || -73.03569
            }}
            title={bus.route_short_name}
            key={bus.id}
          >
            <Image source={BUS_LOGO_GREEN} />
          </MapView.Marker>
        )) });
      });

      axios.get('https://transitninja.herokuapp.com/api/muniBusses').then(response => {
        this.setState({ muni_busses: response.data.map(bus => (
          <MapView.Marker
            coordinate={{
              latitude: bus.lat + 0.000060 || -36.82339,
              longitude: bus.lon || -73.03569
            }}
            title={bus.route_short_name}
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
        this.setState({ deltalat: region.latitudeDelta, deltalon: region.longitudeDelta });
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.timer = setTimeout(() => {
      // console.log('I do not leak!');
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
    // console.log('region', region);
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });


  }

  async getDirections(destination) {
    try {
      // fetch directions from google.
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${`${this.state.userLat},${this.state.userLong}`}&destination=${destination}&mode=transit`);
      const respJson = await resp.json();
      // console.log(respJson);
      // decode encoded polyline data.
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      // converts polyline data into a list of objects
      const coords = points.map((point) => {
        return { latitude: point[0], longitude: point[1] };
      });
      this.setState({
        directions: respJson || this.state.directions,
        coordo: coords,
        showSlidingPanel: true
      });
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
    console.log(this.state.muni_busses);
    return this.state.muni_busses;
  }

  renderACTransitBusses() {
    return this.state.actransit_busses;
  }

  getContainerHeight = (height) => {
    this.setState({
      containerHeight: height
    });
  }

  resetMap() {
    // console.log('hitta');
    // this.setState({zoomer: !this.state.zoomer});
    if(this.state.route){
    if(this.state.zoomer){
      console.log('zoomer true', this.state.zoomer);

    this.setState({
      mapRegion: { latitude: this.state.userLat, longitude: this.state.userLong, latitudeDelta: this.state.deltalat, longitudeDelta: this.state.deltalon},
      lastLat: this.state.lastLat,
      lastLong: this.state.lastLong,
      zoomer: !this.state.zoomer

    });
  }else{
    // this.setState({zoomer: true});
    console.log('zoomer false', this.state.zoomer);

    // console.log('coordo', this.state.coordo);
    const points = this.state.coordo;
    const startLat = points[0].latitude;
    const startLon = points[0].longitude;
    const endLat = points[points.length - 1].latitude;
    const endLon = points[points.length - 1].longitude;
    const minX = Math.min(startLat, endLat);
    const maxX = Math.max(startLat, endLat);
    const minY = Math.min(startLon, endLon);
    const maxY = Math.max(startLon, endLon);
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltX = (maxX - minX) * 2.5;
    const deltY = (maxY - minY) * 2.5;

    this.setState({ mapRegion: {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltX,
      longitudeDelta: deltY
    },
    zoomer: !this.state.zoomer,
   });
  }} else {
    console.log('routing false');
    this.setState({
      mapRegion: { latitude: this.state.userLat, longitude: this.state.userLong, latitudeDelta: this.state.deltalat, longitudeDelta: this.state.deltalon},
      lastLat: this.state.lastLat,
      lastLong: this.state.lastLong,

    });
  }
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
      this.setState({
        destination: place,
        showSlidingPanel: false,
        route: true
       });
      console.log('place', place);

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
       title={this.state.destination.name || 'temp'}
     />
   );
 }

 toggleZoom() {
  //  console.log('toggggggling');
  console.log(this.state.zoomer);
   this.setState({ zoomer: true });
   this.zoomRoute();
 }

// note that I removed onRegionChange from the MapView props.
// This will speed up our app a bit. But if we WANT to update the mapRegion
// whenever we move the map around, then we'll need to put i back in.

  zoomRoute() {
    // console.log(this.state.coordo);

    if (this.state.coordo.length > 0) {
      this.setState({ zoomer: true });

      // console.log('coordo', this.state.coordo);
      const points = this.state.coordo;
      const startLat = points[0].latitude;
      const startLon = points[0].longitude;
      const endLat = points[points.length - 1].latitude;
      const endLon = points[points.length - 1].longitude;
      const minX = Math.min(startLat, endLat);
      const maxX = Math.max(startLat, endLat);
      const minY = Math.min(startLon, endLon);
      const maxY = Math.max(startLon, endLon);
      const midX = (minX + maxX) / 2;
      const midY = (minY + maxY) / 2;
      const deltX = (maxX - minX) * 2.5;
      const deltY = (maxY - minY) * 2.5;

      this.setState({ mapRegion: {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltX,
        longitudeDelta: deltY
      }, opsRegion: {
        latitude: midX,
        longitude: midY,
        latitudeDelta: deltX,
        longitudeDelta: deltY
      } });
    }
  }


  renderPol() {
    // console.log('coordinates', this.state.coordo);
    return (

      <MapView>
        <MapView.Polyline
          lineCap='round'
          lineJoin='round'
          coordinates={this.state.coordo}
          strokeWidth={5}
          strokeColor='#428ff4'
        />
      </MapView>
    );
  }

  // <MapView.Marker
  //   coordinate={{
  //     latitude: parseFloat(this.state.directions.routes[0].legs[0].end_location.lat),
  //     longitude: parseFloat(this.state.directions.routes[0].legs[0].end_location.lng)
  //   }}
  // >
  // </MapView.Marker>

  renderSlidingPanel() {
    console.log('renderslidingPanel', this.state.showSlidingPanel);
    // this.setState({
    //   showSlidingPanel: false
    // });
    return (
      <SlidingUpPanel
        ref={panel => { this.panel = panel; }}
        containerMaximumHeight={MAXIMUM_HEIGHT}
        containerBackgroundColor={'green'}
        handlerHeight={MINUMUM_HEIGHT}
        allowStayMiddle
        handlerDefaultView={<HandlerOne state={this.state} />}
        getContainerHeight={this.getContainerHeight}
      >
        <ScrollView style={styles.frontContainer}>
          {this.state.directions.routes[0].legs[0].steps.map(function(step, idx) {
            if (step.travel_mode === 'WALKING') {
              return (
                <View key={idx}>
                  <Text style={styles.baseText}>
                    {'\n'}
                    <Image source={WALK} style={styles.walkStyle} />
                    {step.html_instructions}
                    {'\n'}
                    {step.distance.text} {step.duration.text}
                    {'\n'}
                  </Text>
                </View>
              );
            } else if (step.travel_mode === 'TRANSIT') {
              return (
                <View key={idx}>
                  <Text style={styles.baseText}>
                    <Image source={BUS} style={styles.busStyle} />
                    {step.html_instructions} {'\n'}
                    {step.transit_details.line.short_name}
                    {step.transit_details.line.name} {'\n'}
                    {step.distance.text} {step.duration.text} {'\n'}
                    {step.transit_details.num_stops}
                    {'\n'}
                  </Text>
                </View>
              );
            }
            })
          }
        </ScrollView>
      </SlidingUpPanel>

    );
  }

searching() {
  return (
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
);
}


  render() {
    // console.log('render-state', this.state);
    return (
      <View style={styles.viewStyle}>


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
      </MapView>
      <View style={styles.buttonView}>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={'rgba(255, 0, 0, 0)'}
          onPress={this.resetMap}
          style={styles.recenter}
        >
          <View>
            <ToggleButton logo={RECENTER_LOGO} />
          </View>
        </TouchableHighlight>
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
              logo={PIN_SHOW_GREEN}
              text={'AC Transit'}
            />
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={1}
          underlayColor={'rgba(255, 0, 0, 0)'}
          onPress={this.openSearchModal}
          style={styles.buttonPress}
        >
          <View>
            <ToggleButton
              logo={SEARCHER}
              text={'Search'}
            />
          </View>
        </TouchableHighlight>


        </View>

        {this.state.showSlidingPanel ? this.renderSlidingPanel() : null }

    </View>
    );
  }
}
        // {this.state.updateHandlerOne ? this.updateHandlerOne() : null }
const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    alignItems: 'stretch'
  },
  busStyle: {
    width: 15,
    height: 15
  },
  walkStyle: {
    width: 15,
    height: 25
  },
  baseText: {
    textAlign: 'center'
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
    flexDirection: 'column',
    justifyContent: 'space-around',
    bottom: 500,
    top: 320,
    left: 300,
    right: 10,
    height: 300
  },
  buttonPress: {
    opacity: 0.55
  },
  button: {
    opacity: 1
  },
  frontContainer: {
    flex: 1,
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

// <View style={styles.hamburger}>
//   <TouchableOpacity onPress={() => Actions.modal()}>
//     <Image source={HAMBURGER} />
//   </TouchableOpacity>
// </View>

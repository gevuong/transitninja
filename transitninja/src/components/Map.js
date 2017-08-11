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

import Button from 'react-native-button';


const BUS_LOGO = require('../../assets/bus_icon_green.png');

// const BUS_STOP_RED = require('../../assets/Bus_Stop_Red.png');
// const BUS_STOP_GREEN = require('../../assets/Bus_Stop_Green.png');




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
    // this.renderPol = this.renderPol.bind(this);

  }

// this is some code to customize eslint for this page.
  /*global navigator:true*/
  /*global alert:true*/
  /*global require:true*/
  /*eslint no-undef: "error"*/
  componentWillMount() {
    // axios.get('http://localhost:3000/api/muniStations').then(response => {
    //   this.setState(prevState => ({
    //     muni_stops: prevState.muni_stops.concat(response.data) }));
    // });
    axios.get('http://localhost:3000/api/actransitBusses').then(response => {
      this.setState({ actransit_busses: response.data });
    });

    axios.get('http://localhost:3000/api/bartStations').then(response => {
      console.log('this is getting hit');
      this.setState({ bart_stops: response.data });
    });
    axios.get('http://localhost:3000/api/caltrainStations').then(response => {
      console.log('this is getting hit');
      this.setState({ caltrain_stops: response.data });
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
    // const arr = [];
    // this.state.muni_stops.forEach((stop) => {
    //   if (this.isInRegion(stop.stop_lat, stop.stop_lon)) {
    //     arr.push(stop);
    //   }
    // });
    // this.setState({ muni_stops_to_render: arr });
    // const arr2 = [];
    // this.state.actransit_stops.forEach((stop) => {
    //   if (this.isInRegion(stop.stop_lat, stop.stop_lon)) {
    //     arr2.push(stop);
    //   }
    // });
    // this.setState({ actransit_stops_to_render: arr2 });
  }


  async getDirections() {
      console.log('hit');

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

  // isInRegion(lat, long) {
  //   console.log('coordinates', lat, long);
  //   const { latitude, longitude, latitudeDelta, longitudeDelta } = this.state.mapRegion;
  //   const top = latitude - (latitudeDelta * 0.5);
  //   const bottom = latitude + (latitudeDelta * 0.5);
  //   const right = longitude - (longitudeDelta * 0.5);
  //   const left = longitude + (longitudeDelta * 0.5);
  //   if (lat > top) {
  //    return false;
  //   }
  //   return true;
  // }


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

  renderMuni() {

    console.log('from render', this.state.muni_stops_to_render);
    return this.state.muni_stops_to_render.map(stop => (

      <MapView.Marker
        coordinate={{
          latitude: bus.lat || -36.82339,
          longitude: bus.lon || -73.03569
        }}

        title={stop.stop_name}
        key={stop.stop_id}
      />

    ));
  }

  renderACTransit() {

    return this.state.actransit_stops_to_render.map(stop => (

      <MapView.Marker
        coordinate={{
          latitude: bus.lat || -36.82339,
          longitude: bus.lon || -73.03569
        }}

        title={stop.stop_name}
        key={stop.stop_id}
      />
    ));
  }

  renderACTransitBusses() {
    console.log(this.state.actransit_busses);

    return this.state.actransit_busses.map(bus => (
      <MapView.Marker
        coordinate={{
          latitude: bus.lat + 0.000060 || -36.82339,
          longitude: bus.lon || -73.03569
        }}
        title={bus.trip_id}
        key={bus.id}
      >
        <Image source={BUS_LOGO} />

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
    console.log('yooukhkgughhhhhh');
    return (
    <MapView.Polyline
       coordinates={this.state.coordo}
       strokeWidth={20}
       strokeColor="green"
    />
  );
  }


//   bartCaltrainPins
//           {this.state.muni_stops.map(stop => (
//             <MapView.Marker
//               coordinate={{
//                 latitude: stop.stop_lat || -36.82339,
//                 longitude: stop.stop_lon || -73.03569
//               }}
//               title={stop.stop_name}
//               key={stop.stop_id}

//             />
//           ))}

//           {this.state.actransit_stops.map(stop => (
//             <MapView.Marker
//               coordinate={{
//                 latitude: stop.stop_lat || -36.82339,
//                 longitude: stop.stop_lon || -73.03569
//               }}
//               title={stop.stop_name}
//               key={stop.stop_id}
//               pinColor={'#000000'}

//             />
//           ))}

//           {this.state.bart_stops.map(stop => (
//             <MapView.Marker
//               coordinate={{
//                 latitude: stop.stop_lat || -36.82339,
//                 longitude: stop.stop_lon || -73.03569
//               }}
//               title={stop.stop_name}
//               key={stop.stop_id}
//               pinColor={'#3498DB'}
//             />
//           ))}

//           {this.state.caltrain_stops.map(stop => (
//             <MapView.Marker
//               coordinate={{
//                 latitude: stop.stop_lat || -36.82339,
//                 longitude: stop.stop_lon || -73.03569
//               }}
//               title={stop.stop_name}
//               key={stop.stop_id}
//               pinColor={'#F7DC6F'}
//             />
//           ))}

//           <MapView.Marker
//             coordinate={{
//               latitude: this.state.lastLat || -36.82339,
//               longitude: this.state.lastLong || -73.03569
//             }}
//           >
//             <Image
//               source={BUS_STOP_RED} style={styles.busIconStyle}
//             />
//           </MapView.Marker>
//           <MapView.Marker
//             coordinate={{
//             latitude: this.state.lastLat || -36.82339,
//             longitude: this.state.lastLong || -73.03569
//             }}
//           />
//           <MapView.Polyline
//              coordinates={this.state.coordo}
//              strokeWidth={2}
//              strokeColor="red"
//           />

//           </MapView>
//           <TemporaryConnection />
  
  render() {
    // <Header />

    // console.log(this.state);
    return (
      <View style={styles.viewStyle}>
          <SearchBar
            ref={(ref) => { this.searchBar = ref; }}
            data={['sanjose, sanfrancisco']}
            handleResults={this.logger}
            showOnLoad
            textColor={'#FF0000'}
            handleChangeText={(e) => this.setState({ destination: e })}
            onSubmitEditing={() => this.getDirections().then(this.renderPol())}
          />
        <MapView
          region={this.state.mapRegion}
          showsUserLocation
          followUserLocation
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.mapStyle}
        >


        {this.renderPol()}

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

          {this.state.bart_stops.map(stop => (
            <MapView.Marker
              coordinate={{
                latitude: stop.stop_lat || -36.82339,
                longitude: stop.stop_lon || -73.03569
              }}
              title={stop.stop_name}
              key={stop.stop_id}
              pinColor={'#3498DB'}
            />
          ))}

          {this.state.caltrain_stops.map(stop => (
            <MapView.Marker
              coordinate={{
                latitude: stop.stop_lat || -36.82339,
                longitude: stop.stop_lon || -73.03569
              }}
              title={stop.stop_name}
              key={stop.stop_id}
              pinColor={'#F7DC6F'}
            />
          ))}

          <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat || -36.82339,
              longitude: this.state.lastLong || -73.03569
            }}
          >
            <Image
              source={BUS_STOP_RED} style={styles.busIconStyle}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{
            latitude: this.state.lastLat || -36.82339,
            longitude: this.state.lastLong || -73.03569
            }}
          />




        { this.renderACTransitBusses() }
        <View style={styles.buttonView}>
          <Button
            containerStyle={this.state.showMuni ? styles.toggleOn : styles.toggleOff}
            style={this.state.showMuni ? styles.textToggleOn : styles.textToggleOff}
            onPress={this.toggleMuni}
          >Muni
          </Button>
          <Button
            containerStyle={this.state.showACTransit ? styles.toggleOn : styles.toggleOff}
            onPress={this.toggleACTransit}
            style={this.state.showMuni ? styles.textToggleOn : styles.textToggleOff}
          >AC
          </Button>
        </View>
        </MapView>

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
  mapStyle: {
    flex: 1
  },
  // busIconStyle: {
  //   width: 15,
  //   height: 15
  // },
  buttonView: {
    marginTop: 80,
    marginLeft: 220,
    marginBottom: 80,
    // height: 300,
    // width: 1000,
    // flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end'
  },
  toggleOn: {
    marginTop: 30,
    marginLeft: 30,
    height: 60,
    width: 60,
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'white',
    shadowColor: '#353535',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10
  },
  textToggleOn: {
    fontSize: 12,
    color: '#797979',
  },
  toggleOff: {
    marginTop: 30,
    marginLeft: 30,
    height: 60,
    width: 60,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#A1A1A1',
    shadowColor: '#353535',
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10
  },
  textToggleOff: {
    fontSize: 12,
    backgroundColor: '#A1A1A1',
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

// @mixin shadow-2 {
//   box-shadow: 0 0.9px 4px 0 rgba(0,0,0,0.05);
// }

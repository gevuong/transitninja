import React, { Component, PropTypes} from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';

export default class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null
    };
  }

  componentDidMount(){
    this.watchID= navigator.geolocation.watchPosition(
      (position)=>{
        let region = {
          latitude:       position.coords.latitude,
          longitude:      position.coords.longitude,
          latitudeDelta:  0.00922*1.5,
          longitudeDelta: 0.00421*1.5
        };
        this.onRegionChange(region, region.latitude, region.longitude);
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={true}
          followUserLocation={true}
          onRegionChange={this.onRegionChange.bind(this)}>
          <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat || -36.82339,
              longitude: this.state.lastLong || -73.03569
            }}
            >
            <Image
              source={require('../../assets/bus.png')} style={styles.busIconStyle}
            />
          </MapView.Marker>
          <MapView.Marker
            coordinate={{
            latitude: this.state.lastLat || -36.82339,
            longitude: this.state.lastLong || -73.03569
          }} />
          </MapView>
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

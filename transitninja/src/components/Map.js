import React, {PropTypes} from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import MapView from 'react-native-maps';

export default class MyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { x: {latitude: 37.78824, longitude: -122.4324} };
  }

  render() {
    return (
      <View>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <MapView.Marker
            draggable
            coordinate={this.state.x}
            onDragEnd={(e)=>this.setState({x: e.nativeEvent.coordinate})} >
            <Image
              source={require('../../assets/bus.png')} style={styles.busIconStyle}
            />
          </MapView.Marker>
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

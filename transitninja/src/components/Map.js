import React from 'react';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';

const Map = () => {
  console.log("this is getting hit!");
  const { mapStyle } = styles;

  return (
    <View>
      <MapView style={mapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
     />
    </View>
  );
};

const styles = {
  mapStyle: {
    width: 700,
    height: 800,
    backgroundColor: 'skyblue'
  },
};

export default Map;

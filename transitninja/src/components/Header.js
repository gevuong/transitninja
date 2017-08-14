// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Polyline from '@mapbox/polyline';
// import fetch from 'isomorphic-fetch';
// import SearchBar from 'react-native-searchbar';
//
// const startLoc = 'sanjose';
// const endLoc = 'sanfrancisco';
//
// class Header extends React.Component {
//   constructor(props) {
//       super(props);
//       this.state = {
//         latitude: '',
//         longitude: '',
//       destination: '',
//       coordo: [],
//       res: ''
//       };
//     this.getDirections = this.getDirections.bind(this);
//     this.yoo = this.yoo.bind(this);
//   }
//
//
//   componentWillMount() {
//     // this.yoo();
//   }
//   // searching(property) {
//   //   console.log(this.state);
//   //   return e => this.setState({ [property]: e.target.value });
//   // }
//
//   componentDidMount() {
//   // find your origin and destination point coordinates and pass it to our method.
//   // I am using Bursa,TR -> Istanbul,TR for this example
//   // this.getDirections('40.1884979, 29.061018', '41.0082,28.9784');
// }



  // logger() {
  //     // console.log('test');
  //
  // }



// async getDirections() {
//     console.log('hit');
//
//     try {
//       // fetch directions from google.
//       const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}`);
//       const respJson = await resp.json();
//       console.log(respJson);
//       // decode encoded polyline data.
//       const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
//       // converts polyline data into a list of objects
//       const coords = points.map((point) => {
//         return { latitude: point[0], longitude: point[1] };
//       });
//       this.setState({ coordo: coords });
//       console.log(this.state.coordo);
//       return coords;
//     } catch (error) {
//       return error;
//     }
//   }
//   yoo() {
//     console.log('hitting');
//   }
//   // handleres(results) {
//   //   this.setState({ res: results });
//   // }
//
//   render() {
//     console.log(this.state.destination);
//
//
//     return (
//
//       <View style={styles.viewStyle}>
//
//         <SearchBar
//           ref={(ref) => { this.searchBar = ref; }}
//           data={['sanjose, sanfrancisco']}
//           handleResults={this.logger}
//           showOnLoad
//           textColor={'#FF0000'}
//           handleChangeText={(e) => this.setState({ destination: e })}
//           onSubmitEditing={this.getDirections}
//         />
//       </View>
//     );
//   }
//
//
// }

 // render() {
 //   return (
 //     <View>
 //       <MapView style={styles.map} initialRegion={{
 //         latitude:41.0082,
 //         longitude:28.9784,
 //         latitudeDelta: 0.0922,
 //         longitudeDelta: 0.0421
 //       }}>
 //
 //       <MapView.Polyline
 //           coordinates={this.state.coords}
 //           strokeWidth={2}
 //           strokeColor="red"/>
 //
 //       </MapView>
 //     </View>
 //   );
 // }

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }

});


// make the component available to other parts of the app
export default Header;

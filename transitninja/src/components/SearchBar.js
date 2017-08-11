import React, {PropTypes} from 'react';
import { Text } from 'react-native';
import SearchBar from 'react-native-searchbar';

export default class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      destination: ''
    };
  }
  //
  // changeInput(property){
  //   return e => this.setState({[property]: e.target.value})
  // }
  //
  // render(){
  //
  //   const getDirections = (startLoc, destinationLoc) => {
  //     try {
  //       // fetch directions from google.
  //       let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
  //       let respJson = await resp.json();
  //       // decode encoded polyline data.
  //       let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //       // converts polyline data into a list of objects
  //       let coords = points.map((point, index) => {
  //         return  {
  //           latitude : point[0],
  //           longitude : point[1]
  //         }
  //       })
  //       this.setState({coords: coords})
  //       return coords
  //     } catch(error) {
  //       return error
  //     }
  //   }
  //
  //
  //   return(
  //   <SearchBar
  //   ref='searchBar'
  //   placeholder='Search'
  //   onChangeText={this.changeInput('destination')}
  //   onSearchButtonPress={}
  //   onCancelButtonPress={}
  //   />);

  // }


}

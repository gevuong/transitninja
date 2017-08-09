import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

class TemporaryConnection extends Component {
  constructor() {
    super();
    this.state = { transit_info: [] };
  }

  componentWillMount() {
    // We need to replace the following url with the location of our server. (e.g. replace with http://localhost:3000)
    axios.get('http://localhost:3000/api/muniStations').then(response => this.setState({ transit_info: response.data }));
      // http requests return a promise to us, because http requests are inherently asynchronous.

  }


  render() {
    console.log("state", this.state.transit_info);

    return (
      <View>
      <Text>
        This is a temporary filler. Check the console logs to see if the json information from oru backend is being returned correctly.
      </Text>
      </View>
    );
  }

}
export default TemporaryConnection;

import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const BUS = require('../../assets/bus.png');

const deviceWidth = Dimensions.get('window').width;

export default class HandlerOne extends Component {


  render() {
    console.log('handlerOneProps', this.props);
    const address = this.props.state.destination.address;
    const location = address.slice(address.indexOf(',') + 2);
    return (
      <View style={styles.handlerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.handlerText}>

            <Text style={styles.destination}>
            {this.props.state.destination.name} {'\n'}
            </Text>
            <Text style={styles.address}>
              {location}
            </Text>

          </Text>
          <View style={styles.busDuration}>
            <Image source={BUS} style={styles.busStyle} />
            <Text style={styles.duration}>
              {this.props.state.directions.routes[0].legs[0].duration.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  address: {
    fontSize: 15,
    fontWeight: '400',
    marginTop: 10
  },
  destination: {
    paddingTop: 25,
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: '700'
  },
  handlerText: {
    color: 'white',
    padding: 10,
    paddingTop: 10
  },
  duration: {
    color: 'white',
    fontSize: 11,
    marginTop: 5
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    top: 10,
    marginLeft: 15
  },
  busDuration: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 80,
    alignItems: 'center',
    left: 10
  },
  handlerContainer: {
    height: 80,
    width: deviceWidth,
    backgroundColor: 'red',
    opacity: 0.7
  },
  busStyle: {
    top: 10,
    height: 21,
    width: 21,
    marginBottom: 10
  }
});

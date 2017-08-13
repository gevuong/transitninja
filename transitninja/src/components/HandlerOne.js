import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const BUS = require('../../assets/bus.png');

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


export default class HandlerOne extends Component {
  render() {
    console.log('props', this.props);
    return (
      <View style={styles.handlerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.handlerText}>
            {this.props.state.destination.name}
          </Text>
          <View style={styles.busDuration}>
            <Image source={BUS} style={styles.busStyle} />
            <Text>
              {this.props.state.directions.routes[0].legs[0].duration.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  handlerText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'transparent',
    padding: 15,
    height: 80
  },
  busDuration: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white'
  },
  handlerContainer: {
    height: 80,
    width: deviceWidth,
    // alignItems: 'center',
    backgroundColor: 'red',
    opacity: 0.7
  },
  busStyle: {
    height: 30,
    width: 30
  }
});

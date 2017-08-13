import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


export default class HandlerOne extends Component {
  render() {
    return (
      <View style={styles.handlerContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.handlerText}>Directions</Text>
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
    backgroundColor: 'transparent',
    height: 80,
    justifyContent: 'center'
  },
  handlerContainer: {
    height: 80,
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: 'gray',
    opacity: 0.7
  },
});

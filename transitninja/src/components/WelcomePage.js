import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import TemporaryConnection from './TemporaryConnection';

import { Actions } from 'react-native-router-flux';

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.welcome}
        onPress={() => Actions.mapPage()}
      >
        Welcome to the Demo!
        Click here to get to the map page.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default WelcomePage;

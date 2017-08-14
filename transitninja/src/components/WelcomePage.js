import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//
// const NINJA_ICON = require('../../assets/transitninjaicon.png');
// const NINJA_LOGO = require('../../assets/transitninjalogo.png');
const NINJA_ICON = require('../../assets/transitninjaicon2.png');

const WelcomePage = () => {
  return (
    <View style={styles.container}>
    <TouchableHighlight onPress={() => { Actions.mapPage(); }}>
      <View style={styles.viewStyle}>

        <Image source={NINJA_ICON} />
        <Text> Click to Begin!</Text>
      </View>
    </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#353535'
  },
  viewStyle: {
    height: 1000,
    width: 1000,
    backgroundColor: '#353535',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default WelcomePage;

import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const ToggleButton = ({ logo, text }) => {
  return (
    <View style={styles.toggleStyle}>
      <View style={styles.darkShadow}>
        <Image style={{ overflow: 'visible' }} source={logo} />
      </View>
      <View style={styles.lightShadow}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  darkShadow: {
    padding: 10,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 8,
    shadowOpacity: 0.6,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center'
  },
  lightShadow: {
    height: 100,
    width: 100,
    marginTop: 40,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 15,
    shadowOpacity: 1
  },
});

export default ToggleButton;

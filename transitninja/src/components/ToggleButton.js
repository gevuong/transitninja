import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const ToggleButton = ({ logo, text }) => {
  return (
    <View style={styles.toggleStyle}>
      <Image source={logo} />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  textStyle: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
    textShadowColor: 'white',
    textShadowOffset: { width: 10, height: 10 },
    textShadowRadius: 40,
  }
});

export default ToggleButton;

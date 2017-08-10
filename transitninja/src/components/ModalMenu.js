import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
    };
  }

  onSwipeRight(gestureState) {
    Actions.pop();
    this.setState({ myText: 'You swiped right!' });
  }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={styles.container}
      >
        <Text
          style={styles.welcome}
          onPress={() => Actions.pop()}
        >
          Modal. Click Me to go back to map page.
        </Text>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8200',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  }
});

export default ModalMenu;

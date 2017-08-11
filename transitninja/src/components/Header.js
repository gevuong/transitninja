import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from 'react-native-searchbar';

class Header extends React.Component {
  logger() {
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <SearchBar
          ref={(ref) => { this.searchBar = ref; }}
          data={[1, 2, 3]}
          handleResults={this.logger()}
          showOnLoad
        />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }

});

// make the component available to other parts of the app
export default Header;

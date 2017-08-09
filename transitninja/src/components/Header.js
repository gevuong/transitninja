import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import Search from 'react-native-search-box';

class Header extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.viewStyle}>
        <Search
          ref="search_box" />
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

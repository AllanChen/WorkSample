/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';

const main = require('./main.ios.js');
const start = require('./start.js');
class weathers extends Component {
  constructor(props) {
        super(props);
    }
 toggleNavBar(){
   this.setState({
      // navigationBarHidden:!this.state.navigationBarHidden;
   });
 }

  render() {
    return (
    <NavigatorIOS ref="nav"
          itemWrapperStyle={styles.navWrap}
          style={styles.nav}
          navigationBarHidden={true}
          initialRoute={{
            title:'Main',
            component:start,
            passProps:{
              
            }
          }}/>
    );
  }
}

const styles = StyleSheet.create({
  navWrap: {
      flex: 1,
     	marginTop: 0
    },
    nav: {
      flex: 1,
    },
});

AppRegistry.registerComponent('weathers', () => weathers);

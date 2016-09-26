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
        this._panResponder = {};
        this._isSwiping = false;
        this.state = {
          navigationBarHidden: false
        };
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
          navigationBarHidden={!this.state.navigationBarHidden}
          initialRoute={{
            title:'Main',
            component:start,
            passProps:{
              toggleNavBar:this.toggleNavBar,
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
    button: {
      backgroundColor: "#009DDD",
      padding: 10,
      margin: 10,
    },
    buttonText: {
      color: "#fff"
    }
});

AppRegistry.registerComponent('weathers', () => weathers);

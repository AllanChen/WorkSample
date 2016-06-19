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
  TouchableHighlight,
  NavigatorIOS,
  View
} from 'react-native';

var weatherTable = require('./tableview.ios.js')
var weather = React.createClass({
  getInitialState() {
    return {
      navigationBarHidden: false
    };
  },

  toggleNavBar() {
    this.setState({
      navigationBarHidden: !this.state.navigationBarHidden
    });
  },

  render() {
    return (
      <NavigatorIOS ref="nav"
                    itemWrapperStyle={styles.navWrap}
                    style={styles.nav}
                    navigationBarHidden={this.state.navigationBarHidden}
                    initialRoute={{
                      title: "城市列表",
                      component: weatherTable,
                      passProps: {
                        toggleNavBar: this.toggleNavBar,
                      }
                    }} />
    );
  }
});

var styles = StyleSheet.create({
  navWrap: {
    flex: 1,
   	marginTop: 70
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


AppRegistry.registerComponent('weather', () => weather);

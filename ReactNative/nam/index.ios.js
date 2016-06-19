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
  navBar,
  View
} from 'react-native';

var nam = require('./tableview.ios.js')

AppRegistry.registerComponent('nam', () => nam);

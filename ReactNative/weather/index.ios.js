import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux'
import App from './App/App.js'
import Store from './App/Store/Store.js'
export default class weather extends Component {
  render() {
    return (
      <Provider>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('weather', () => weather);

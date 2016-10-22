import React, { Component } from 'react';
import App from './App/App';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Provider} from 'react-redux'
import store from './App/Store/store.js'
export default class weather extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('weather', () => weather);

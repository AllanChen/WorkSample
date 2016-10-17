/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

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
let weather = require('./Storage/weather.json');

var storage;
class weathers extends Component {
  constructor(props) {
    super(props);
    this.initStorage();
    this.saveDataToStorage('北京',weather.weather[0]);
    this.loadData('北京');
  }

  initStorage() {
   storage = new Storage({ 
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true,
      sync: {
        
      }
    })
  }

  saveDataToStorage(keyWord,data) {
    storage.save({
      key: keyWord,
      rawData: data,
      expries: 1000 * 3600
    });
  }

  loadData(keyWord) {
    storage.load({
      key: keyWord,
      autoSync: true,
      syncInBackground: true
    }).then(ret => {
      alert(ret.city_name);
    }).catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          alert('NotFoundError');
          break;
        case 'ExpiredError':
          alert('ExpiredError');
          break;
      }
    })
  }

  render() {
    return (
      <NavigatorIOS ref="nav"
        itemWrapperStyle={styles.navWrap}
        style={styles.nav}
        navigationBarHidden={true}
        initialRoute={{
          title: 'Main',
          component: start,
          passProps: {}
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

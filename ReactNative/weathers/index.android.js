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
  Navigator,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import PageOne from './Section/pageOne.js'
import PageTwo from './Section/pageTwo.js'
import g from './Config/config.js'
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
  toggleNavBar() {
    this.setState({
      // navigationBarHidden:!this.state.navigationBarHidden;
    });
  }
  render() {
    return (
      <Image
        style={styles.bgImage}
        source = {require('./images/bg.jpg') }
        >
        <View style={styles.headView}>
          <TouchableHighlight
            onPress = {() => {
              
            } }
            underlayColor = 'rgba(0,0,0,0)'
            >
            <Image style={{ width: 20, height: 20, marginLeft: 10 }} source = {require('./images/add.png') }></Image>
          </TouchableHighlight>
          <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 18 }}> 广州 </Text>
          <View style={{ width: 20, height: 20 }}></View>
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          <PageOne />
          <PageTwo />
        </ScrollView>
      </Image>
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
  scrollViewContainer: {
    height: g.SHEIGHT - 50,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  bgImage: {
    width: g.SWIDTH,
    height: g.SHEIGHT,
  },

  headView: {
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: 'row',
    width: g.SWIDTH,
    marginTop: 25,
    height: 25,
    justifyContent: 'space-between'
  },
});




AppRegistry.registerComponent('weathers', () => weathers);

import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  NavigatorIOS,
  TouchableWithoutFeedback,
  ListView,
  View,
  Image,
  ScrollView
} from 'react-native';
var screenHeight = Dimensions.get('window').height;
var screenWidth  = Dimensions.get('window').width;
var result = [];
var ScrollDetailPage = React.createClass({
_onFetch(address) {
  var url = "http://api.map.baidu.com/telematics/v3/weather?location="+address+"&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD";
  	fetch(url)
  			.then((response) => response.text())
  			.then((responseText) => {
    				var arr_from_json = JSON.parse(responseText);
    				result = arr_from_json.results[0];
  			})
  			.catch((error) => {
          alert(error);
    			console.warn(url);
  			});
  },

render(){
  return(
  <View style={styles.container}>
    <Image source = {{uri:"http://img9.dzdwl.com/img/rdn_4f475ddb620d8.jpg"}} style={{width:screenWidth,height:screenHeight}}/>
    <ScrollView>
        <View style={styles.row}>
            <View style={styles.cellBox}><Text style={styles.contentTxt} numberOfLines={1}>{result[rowID].date}</Text></View>
            <View style={styles.cellBox}><Text style={styles.contentTxt} numberOfLines={1}>{result[rowID].weather}</Text></View>
            <View style={styles.cellBox}><Text style={styles.contentTxt} numberOfLines={1}>{result[rowID].temperature}</Text></View>
        </View>
    </ScrollView>
  </View>)}
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
module.exports = ScrollDetailPage;

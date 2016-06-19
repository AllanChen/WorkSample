'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TouchableHighlight,
  Component,
  View,
} = ReactNative

var RowView = React.createClass({
  _onPress(rowNum){
    console.log('hello');
  },

render(){

      var rowNum;
     return(
      <View style = {screenStyles.container}>
            <TouchableHighlight
              onPress = {() => this._onPress(rowNum)}
              >            
              <Text style = {screenStyles.textColor}>加载更多</Text>
            </TouchableHighlight>
      </View>
    );
  }
});

var screenStyles = {
  container:{
    flex:1,
    height:30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#a8a9a6',
  },

  textColor:{
    fontSize:16,
  }

};

module.exports = RowView;

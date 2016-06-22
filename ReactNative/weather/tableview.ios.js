'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight
} = require('react-native');

var GiftedListView = require('react-native-gifted-listview');
var RowView = require('./rowview.ios.js');
var color =['4285f4','fe5b59','f7a547','6acd5b','d085de'];
var rows = [];
var TableView = React.createClass({
_onFetch(page = 1, callback, options) {
  // var returnData = eval("(" + returnString + ")");  
  var colorDatas = color;
  var addressData = require('./address.json');
  for(var i in addressData){
    rows.push([addressData[i].name]);
  }
  callback(colorDatas,rows);
  },
  
  _renderRowView (colorData,rowData){
    return(
      <TouchableHighlight
        style={{backgroundColor: 'blue', flex: 0.3, height:80}}
        onPress = {() => this._onPress(rowData)}>
      <Text
      style = {styles.rowText}
      >{colorData}</Text>
      </TouchableHighlight>
    );
  },

  _renderCoustomLoadMoreView(rowData){
     return <RowView />
  },
        
  _onPress(rowData){
    console.log(rowData+' pressed');
  },

  render(){
      return(
      <View style={styles.container}>
        <View style={styles.navBar} />        
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          onPress={this._onPress}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={false} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          paginationWaitingView = {this._renderCoustomLoadMoreView}
          refreshableTintColor="black"
        ></GiftedListView>
      </View>
      )
  }
});

var styles = {  
  container: {
    flex: 1,
  },
  row: {
    padding: 10,
    height: 80,
  },
  rowText:{
    fontSize:20,
    backgroundColor :'#CCC'
  },
  load_more_view:{
    height: 88,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,
  }
};
module.exports = TableView;
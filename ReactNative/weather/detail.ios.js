/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  Image
} from 'react-native';

var screenHeight = Dimensions.get('window').height;
var screenWidth  = Dimensions.get('window').width;
var result = [];
var weather_data = [];
var dataSource
var DetailPage = React.createClass({

getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
	this._onFetch(this.props.text);
},
componentDidMount(){
},

_reloadLiveViewData: function(datas) {
  var newDataSource = this.state.dataSource.cloneWithRows(datas);
  this.setState({
    dataSource: newDataSource,
  });
},

_onFetch(address) {
var url = "http://api.map.baidu.com/telematics/v3/weather?location="+address+"&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD"; 
	fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
  				var arr_from_json = JSON.parse(responseText);
  				result = arr_from_json.results[0].index;
                weather_data = arr_from_json.results[0].
          		this._reloadLiveViewData(result);
			})
			.catch((error) => {
        alert(error);
  			console.warn(url);
			});
},
  
render() {
    return (
     <View style={styles.container}>
        <ListView
            dataSource={this.state.dataSource}
            renderHeader={this._renderHeader}
            renderRow={this._renderRow}
            />
    </View>
    );
  },

_renderHeader(){
  return(
        <View style={{backgroundColor:'#c0c0c0',height:150}}>
        <Image source={{uri: weather_data[0].dayPictureUrl}}
       style={{width: screenWidth, height:150}}></Image>
        </View>
    );
},

 _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
	return(
			<TouchableHighlight>
					<Text style={{padding:10,width:screenWidth}} numberOfLines={5}>
                      {result[rowID].des}
                    </Text>
			</TouchableHighlight>
		);
},

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  header: {
   flexDirection: 'row',
   backgroundColor : 'red',
   height:100,
  },

  bodyContent: {
	 flex:1,
  },

  row: {
    flexDirection: 'row',
    lineHeight: 20,
    padding: 0,
    backgroundColor: '#F6F6F6',
  },

  contentTxt:{
  	width:200,
  	height:200,
  	color:"#f00",
  	padding:70,
  	fontSize:16,
  	justifyContent: 'center',

  }
});
module.exports = DetailPage;

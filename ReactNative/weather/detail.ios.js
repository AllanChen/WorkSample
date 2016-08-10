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
var addressImage = "";
var dataSource
var DetailPage = React.createClass({

getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) =>s1 !== s2}
    );
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
	this._onFetch(this.props.text);
  this._onFetchAddressImage(this.props.text);
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
  				result = arr_from_json.results[0].weather_data;
          weather_data = arr_from_json.results[0].index;
          this._reloadLiveViewData(result);
			})
			.catch((error) => {
        //alert(error);
  			//console.warn(url);
			});
},

_onFetchAddressImage(address){
var addressImageURL = "http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&ie=utf-8&word="+address+"&cg=star&pn=0&rn=5&itg=0&z=0&fr=&width=&height=&lm=-1&ic=0&s=0&st=-1&gsm=3c"
fetch(addressImageURL)
    .then((response) => response.text())
    .then((responseText) => {
        var arr_from_json = JSON.parse(responseText);
        addressImage = arr_from_json['imgs'][0]['middleURL'];
        this._renderHeader(addressImage);
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
            dataSource  ={this.state.dataSource}
            renderRow   ={this._renderRow}
            renderHeader={this._renderHeader}
            renderSectionHeader = {this._renderSectionHeader}
            />
    </View>
    );
  },

_renderSectionHeader: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
  if (sectionID != 's1') {
    return(
      <View style={{backgroundColor:"#c0c0c0", height:20}}>
        <Text>描述</Text>
      </View>
    )
  }

},

/*
| 加载不到网络图片
*/
_renderHeader(imageAddress){
  if (imageAddress) {
    return(
          <View style={{backgroundColor:'#c0c0c0',height:150}}>
          <Image source={{uri: "http://facebook.github.io/react/img/logo_og.png"}}
         style={{width: screenWidth, height:150}}></Image>
          </View>
      );
    }
  else {
    return(
          <View style={{backgroundColor:'#c0c0c0',height:150}}>
          <Image source={{uri: "http://api.map.baidu.com/images/weather/night/duoyun.png"}}
         style={{width: screenWidth, height:150}}></Image>
          </View>
      );
  }
},

 _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
	return(
			<TouchableHighlight>
					<Text style={{padding:10,width:screenWidth}} numberOfLines={1}> {result[rowID].date}      {result[rowID].weather}      {result[rowID].temperature}</Text>
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

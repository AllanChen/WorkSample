/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

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

let screenHeight = Dimensions.get('window').height;
let screenWidth  = Dimensions.get('window').width;
let result = [];
let dataSource;

let DetailPage = React.createClass({
watchID: (null: ?number),

getInitialState: function() {

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
	this._onFetch(this.props.text);
},

componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        // this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000 ,maximumAge:1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) =>{
      var lastPosition = JSON.stringify(position);
      this._updateAddress(lastPosition);
      // this.setState({lastPosition});
    });
},

componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID);
},

_updateAddress(position){
  alert(position);
},

_reloadLiveViewData: function(datas) {
  let newDataSource = this.state.dataSource.cloneWithRows(datas);
  this.setState({
    dataSource: newDataSource,
  });
},

render() {
    return (
     <View style={styles.container}>

     <Image
      style={{width:screenWidth,height:screenHeight}}
      source = {require('./images/bg.jpg')}>
     <View
     automaticallyAdjustContentInsets={true}
     style={styles.header}>
        <Text style={[styles.listViewHeaderViewTextBase],{fontSize:22,paddingBottom:10}}>{this.props.text}</Text>
        <Text style={[styles.listViewHeaderViewTextBase],{paddingBottom:10}}>时区:"Asia/Shanghai"</Text>
        <Text style={styles.listViewHeaderViewTextBase}>Time_offset:"+08:00"</Text>
     </View>
     <View style={styles.listView}>
     <ListView
            automaticallyAdjustContentInsets={false}
            dataSource  ={this.state.dataSource}
            renderRow   ={this._renderRow}
            />
    </View>
      </Image>
    </View>
    );
  },

_onFetch(address) {
  let url = "https://api.thinkpage.cn/v3/weather/daily.json?key=o97r0fxvop12o8cx&location="+address+"&language=zh-Hans&unit=c&start=0&days=5"
	fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
  				let arr_from_json = JSON.parse(responseText);
  				result = arr_from_json.results[0].daily;
          this._reloadLiveViewData(result);
			})
			.catch((error) => {
        alert("onFecth"+error);
  			console.warn(url);
			});
},

_onFetchAddressImage(address){
let addressImageURL = "http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&ie=utf-8&word="+address+"&cg=star&pn=0&rn=5&itg=0&z=0&fr=&width=&height=&lm=-1&ic=0&s=0&st=-1&gsm=3c"
fetch(addressImageURL)
    .then((response) => response.text())
    .then((responseText) => {
        addressData = JSON.parse(responseText);
        this._reloadLiveViewData(result);
    })
    .catch((error) => {
      alert("onFetchAddressImage"+error);
      console.warn(url);
    });
},

 _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
  var imagesString = 'http://www.thinkpage.cn/weather/images/icons/3d_50/'+result[rowID].code_day+'.png';
	return(
			<TouchableHighlight>
      <View style={styles.row}>
					<View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].date}</Text></View>
          <View style={[styles.cellBox]} >
            <Image source={{uri:imagesString}} style={{width:20,height:20,marginRight:10,justifyContent:'flex-start'}}/>
            <Text style={styles.contentTxt}>{result[rowID].text_day}</Text>
          </View>

          <View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].low} ~ {result[rowID].high}</Text></View>
      </View>
			</TouchableHighlight>
		);
},
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
   width:screenWidth,
   height:150,
   paddingTop:65,
   backgroundColor: 'rgba(0,0,0,0)',
  },

  bodyContent: {
	 flex:1
  },
  listViewHeaderViewTextBase:{
    backgroundColor: 'rgba(0,0,0,0)',
    color:"white",
    textAlign:"center",
    fontSize:14,
  },
  row: {
    flexDirection: 'row',
    padding: 0,
  },

  cellBox: {
    flex :1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40,
  },

  listView:{
    width:(screenWidth*0.95),
    marginLeft:screenWidth*0.025,
    backgroundColor:"#333",
    opacity:0.9,
    borderRadius:10,
  },

  contentTxt:{
  	fontSize:16,
  	textAlign: 'center',
    color:"#ffffff",
  }

});
module.exports = DetailPage;

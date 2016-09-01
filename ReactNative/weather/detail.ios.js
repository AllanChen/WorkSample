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
  initialPosition: 'unknown';
  lastPosition: 'unknown';

    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
	this.onFetch(this.props.text);
},

componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let initialPosition = JSON.stringify(position);
        // this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000 ,maximumAge:1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) =>{
      let lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      this.updateAddress();
    });
},

componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID);
},

updateAddress(){
  let url = "http://api.map.baidu.com/geocoder/v2/?ak=CC4d6ab90084e6ca5aa140fc6f68247e&callback=renderReverse&location=23.16,113.23&output=xml&pois=1";
  fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
          let arr_from_json = JSON.parse(responseText);
          result = arr_from_json.results[0].daily;
          this.reloadLiveViewData(result);
      })
      .catch((error) => {
        alert("onFecth"+error);
        console.warn(url);
      });
},

reloadLiveViewData: function(datas) {
  let newDataSource = this.state.dataSource.cloneWithRows(datas);
  this.setState({
    dataSource: newDataSource,
  });
},

render() {
    return (
     <View style={styles.container}>
     <Image source = {require('./images/bg.jpg')} style={{width:screenWidth,height:screenHeight}}>
     <View
     automaticallyAdjustContentInsets={true}
     style={styles.header}>
        <Text style={{fontSize:22,textAlign:'center',color:'white',paddingBottom:10}}>{this.props.text}</Text>
        <Text style={[styles.headerContent]}>时区:"Asia/Shanghai"</Text>
        <Text style={[styles.headerContent]}>Time_offset:"+08:00"{this.state.lastPosition}</Text>
     </View>
     <View style={styles.listView}>
     <ListView
            automaticallyAdjustContentInsets={false}
            dataSource  ={this.state.dataSource}
            renderRow   ={this.renderRow}
            />
    </View>
      </Image>
    </View>
    );
  },

onFetch(address) {
  let url = "https://api.thinkpage.cn/v3/weather/daily.json?key=o97r0fxvop12o8cx&location="+address+"&language=zh-Hans&unit=c&start=0&days=5"
	fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
  				let arr_from_json = JSON.parse(responseText);
  				result = arr_from_json.results[0].daily;
          this.reloadLiveViewData(result);
			})
			.catch((error) => {
        alert("onFecth"+error);
  			console.warn(url);
			});
},

renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
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

  headerContent:{
    backgroundColor: 'rgba(0,0,0,0)',
    color:"white",
    textAlign:"center",
    fontSize:14,
    paddingBottom:10,
  },

  bodyContent: {
	 flex:1
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

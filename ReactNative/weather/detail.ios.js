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

let screenHeight = Dimensions.get('window').height;
let screenWidth  = Dimensions.get('window').width;
let result = [];
let dataSource;

let DetailPage = React.createClass({
var getDataByAddress = function (address){
  let url = "http://restapi.amap.com/v3/geocode/regeo?output=json&location=116.310003,39.991957&key=226fe1c151e83f47689ee4c35f2b1f39&radius=1000&extensions=all";
  fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
          let arr_from_json = JSON.parse(responseText);

          return arr_from_json['regeocode']['addressComponent']['province'];
      })
      .catch((error) => {
        alert ("i'am error"+error);
        alert("onFecth"+error);
        console.warn(url);
      });
  }
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
        var initialPosition = JSON.stringify(position);
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000 ,maximumAge:1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) =>{
      let lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
      // getDataByAddress("");
    });
},

componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchID);
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
     <Image
      style={{width:screenWidth,height:screenHeight}}
      source = {require('./images/bg.jpg')}>
     <View
     automaticallyAdjustContentInsets={true}
     style={styles.header}>
        <Text style={[styles.listViewHeaderViewTextBase]}>{this.props.text}</Text>
        <Text style={[styles.listViewHeaderViewTextBase]}>时区:"Asia/Shanghai"</Text>
        <Text style={styles.listViewHeaderViewTextBase}>Time_offset:"+08:00"</Text>
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

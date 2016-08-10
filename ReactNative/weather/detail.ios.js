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
var addressImage = "http://api.map.baidu.com/images/weather/night/duoyun.png";
var dataSource
var DetailPage = React.createClass({

getInitialState: function() {
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
  // this._onFetchAddressImage(this.props.text);
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

render() {
    return (
     <View style={styles.container}>
     <Image source = {{uri:"http://img.secretchina.com/dat/media/25/2015/05/27/20150527092249819.jpg"}} style={{width:screenWidth,height:screenHeight}}>
     <View
     automaticallyAdjustContentInsets={true}
     style={styles.header}>
        <Text style={{backgroundColor: 'rgba(0,0,0,0)',color:"white",textAlign:"center",fontSize:22,paddingBottom:10}}>{this.props.text}</Text>
        <Text style={{backgroundColor: 'rgba(0,0,0,0)',color:"white",textAlign:"center",fontSize:14,paddingBottom:10}}>时区:"Asia/Shanghai"</Text>
        <Text style={{backgroundColor: 'rgba(0,0,0,0)',color:"white",textAlign:"center",fontSize:14}}>Time_offset:"+08:00"</Text>
     </View>
     <ListView
            automaticallyAdjustContentInsets={false}
            dataSource  ={this.state.dataSource}
            renderRow   ={this._renderRow}
            />
      </Image>
    </View>
    );
  },

_onFetch(address) {
  // var url = "http://api.map.baidu.com/telematics/v3/weather?location="+address+"&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD";
  var url = "https://api.thinkpage.cn/v3/weather/daily.json?key=o97r0fxvop12o8cx&location="+address+"&language=zh-Hans&unit=c&start=0&days=5"
	fetch(url)
			.then((response) => response.text())
			.then((responseText) => {
  				var arr_from_json = JSON.parse(responseText);
  				result = arr_from_json.results[0].daily;
          this._reloadLiveViewData(result);

			})
			.catch((error) => {
        alert("onFecth"+error);
  			console.warn(url);
			});
},

_onFetchAddressImage(address){
var addressImageURL = "http://image.baidu.com/search/avatarjson?tn=resultjsonavatarnew&ie=utf-8&word="+address+"&cg=star&pn=0&rn=5&itg=0&z=0&fr=&width=&height=&lm=-1&ic=0&s=0&st=-1&gsm=3c"
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
	return(
			<TouchableHighlight>
      <View style={styles.row}>
					<View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].date}</Text></View>
          <View style={[styles.cellBox,{flexDirection:'row'}]} >
          <Image source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} style={{width:20,height:20,justifyContent:'center',paddingTop:10}}/>
          <Text style={styles.contentTxt}>{result[rowID].text_day}</Text>
          </View>

          <View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].low}~{result[rowID].high}</Text></View>
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
   backgroundColor: 'rgba(0,0,0,0)'
  },

  headerContent:{

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
    justifyContent:'center'
  },

  contentTxt:{
  	padding:10,
  	fontSize:16,
  	textAlign: 'center',
    color:"#ffffff",
  }

});
module.exports = DetailPage;

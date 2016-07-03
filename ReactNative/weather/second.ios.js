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
  TouchableHighlight,
  NavigatorIOS,
  TouchableWithoutFeedback,
  ListView,
  View
} from 'react-native';
var result = [];
var dataSource
var Secondpage = React.createClass({

 getInitialState: function() {    
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    }
  },

componentWillMount() {
      //this._onFetch();
    },

componentDidMount(){
	this._onFetch();
	var newDataSource = this.state.dataSource.cloneWithRows(result);
	// this.setState({
	// 	dataSource : newDataSource,
	// });
},

_onFetch(){
fetch('http://api.map.baidu.com/telematics/v3/weather?location=%E5%98%89%E5%85%B4&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD')
			.then((response) => response.text())
			.then((responseText) => {
  				console.log(responseText);
  				var arr_from_json = JSON.parse( responseText );
  				result = arr_from_json.results[0].index;
			})
			.catch((error) => {
  				console.warn(error);
			});
},

_genRows(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

render() {
    return (
     <View style={styles.container}>     
     	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeparator={this._renderSeperator}/>
     </View>

    );
  },

_renderRow(rowID:number){
	return(
			<TouchableHighlight>
				<View>
					<Text>result[number].title</Text>
				</View>
			</TouchableHighlight>
		);
},


});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
module.exports = Secondpage;

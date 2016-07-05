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
var result = ["ha","ha","ha"];
var dataSource
var Secondpage = React.createClass({

getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(result),
    };
  },

componentWillMount(){
  
this._onFetch();

},
componentDidMount(){
	
},

_reloadLiveViewData: function(datas) {
  var newDataSource = this.state.dataSource.cloneWithRows(datas);
  this.setState({
    dataSource: newDataSource,
  });
},

_onFetch() {
fetch('http://api.map.baidu.com/telematics/v3/weather?location=%E5%98%89%E5%85%B4&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD')
			.then((response) => response.text())
			.then((responseText) => {
  				var arr_from_json = JSON.parse(responseText);
  				result = arr_from_json.results[0].index;
          this._reloadLiveViewData(result);
			})
			.catch((error) => {
        alert(error);
  			console.warn(error);
			});
},

render() {
    return (
     <View style={styles.container}>     
     	<ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}/>
     </View>

    );
  },

 _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
	return(
			<TouchableHighlight>
				<View>
					<Text>{this.props.text}+ "des:"+ {result[rowID].des}</Text>
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

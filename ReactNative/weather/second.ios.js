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
  				result = JSON.parse(responseText);
  				// result = arr_from_json.results[0].index;
          //this._reloadLiveViewData(result);
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
        <View style={styles.headerView}>
          <Text style={styles.titleText}>

          {this.props.text + '\n' + result.results['pm']}
          </Text>
          <View>
            <Text>
              {}
            </Text>            
          </View>
        </View>
    );
},

 _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
	return(
			<TouchableHighlight>
				<View style={styles.row}>
					<Text style={{padding:10}} numberOfLines={5}>
          "des:"+ {result[rowID].des}
          </Text>
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
  
  headerView:{
  backgroundColor:'#c0c0c0',
  height:150
  },

  titleText:{
    textAlign:'center',
    padding:0
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
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
module.exports = Secondpage;

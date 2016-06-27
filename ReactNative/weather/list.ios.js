'use strict';

var React = require('react');
var ReactNative = require('react-native');
var SecondPage = require('./second.ios.js');

var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} = ReactNative;

var ListViewSimpleExample = React.createClass({
  getInitialState: function() {
  	var addressData = require('./address.json');
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
      // dataSource : ds.cloneWithRows([]),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          // renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeperator}/>
      </View>
    );
  },

_renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void){
	var rowHash = Math.abs(hashCode(rowData));
	return(
		<TouchableHighlight onPress={() => {
          this._pressRow(rowID);          
        }}>
		<View>
          <View style={styles.row}>           
            <Image style={styles.thumb} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
            <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
        </TouchableHighlight>
		);
},
 

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {    
  	this._handleNextButtonPress(rowID);
  },

  _handleNextButtonPress: function(rowID:number) {
        this.props.navigator.push({
 		component : SecondPage,
 		title:"SecondPage",
 		rightButtonTitle:"shop",
 		passProps: {
                text: rowID,
              }
    });
  },

  _renderSeperator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: '#F6F6F6',
  },

  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
    padding:10,
  },
});

module.exports = ListViewSimpleExample;
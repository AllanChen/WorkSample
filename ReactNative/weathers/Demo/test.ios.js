import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Navigator,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';
let addressData = require('./Storage/storage.json');
let rowHeight;
class test extends Component{
    constructor(props){
        super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    rowHeight = function (rowID: number) {
      let pt = 0;
      if (rowID == 0) pt = 23;
      else pt = 10;
      return {
        fontSize: 25,
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#ffffff',
        paddingTop: pt,
        paddingLeft: 10,
      }
    };

    this.state = {
      dataSource: ds.cloneWithRows(addressData),
    };
  }

render() {
    return(
        <View style={styles.container}>
            <TouchableHighlight 
                onPress = {() => {
                    this.props.navigator.pop();
                }}
        >
            <View style={{
                    paddingTop : 100, paddingLeft:100
            }}>
                <Text>back</Text>
            </View>

        </TouchableHighlight>

        <ListView
          automaticallyAdjustContentInsets = {false}
          dataSource = {this.state.dataSource}
          renderRow = {this.renderRow}
          enableEmptySections = {true}
          />
      </View>
        )
  }

renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    let imageHeight = 50;
    if (rowID == 0) imageHeight = 70;
    return (
        <Image
          style = {{ width: 640, height: imageHeight }}
          source = {require('./images/sky.jpg') }
          >
          <View style={styles.row}>
            <Text style={rowHeight(rowID) }>{addressData[rowID].name}</Text>
            <Text style={[rowHeight(rowID), { alignItems: 'flex-end', justifyContent: 'flex-end' }]}>39℃</Text>
          </View>
        </Image>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  contentBox: {
    height: 40,
  },

  firstRowText: {
    paddingTop: 25,
  },

  rowText: {
    fontSize: 25,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#ffffff',
    paddingTop: rowHeight,
    paddingLeft: 10,
  }
});
module.exports = test;
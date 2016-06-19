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
  navBar,
  View
} from 'react-native';

// var GiftedListView = require('react-native-gifted-listview');
var weather = require('./tableview.ios.js')
// class nam extends Component {
//    _onFetch(page = 1, callback, options) {
//     setTimeout(() => {
//       var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
//       if (page === 3) {
//         callback(rows, {
//           allLoaded: true, // the end of the list is reached
//         });        
//       } else {
//         callback(rows);
//       }
//     }, 1000); // simulating network fetching
//   }
//   _onPress(rowData) {
//     console.log(rowData+' pressed');
//   }

//   /**
//    * Render a row
//    * @param {object} rowData Row data
//    */
//   _renderRowView(rowData) {
//     return (
//       <TouchableHighlight
//         style={styles.row}
//         underlayColor='#c8c7cc'
//         onPress={() => this._onPress(rowData)}
//       >  
//         <Text>{rowData}</Text>
//       </TouchableHighlight>
//     );
//   }
  
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.navBar} />
//         <GiftedListView
//           rowView={this._renderRowView}
//           onFetch={this._onFetch}
//           onPress={this._onPress}
//           firstLoader={true} // display a loader for the first fetching
//           pagination={true} // enable infinite scrolling using touch to load more
//           refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
//           withSections={false} // enable sections
//           customStyles={{
//             paginationView: {
//               backgroundColor: '#eee',
//             },
//           }}

//           refreshableTintColor="blue"
//         />
//       </View>
//     );
//   }
// }

// var styles = {
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   navBar: {
//     height: 64,
//     backgroundColor: '#CCC'
//   },
//   row: {
//     padding: 10,
//     height: 44,
//   },
// };

AppRegistry.registerComponent('weather', () => weather);

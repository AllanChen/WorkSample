constructor(props) {
    super(props);
var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} = ReactNative;
var addressData = require('../Storage/address.json');
var ListViewSimpleExample = React.createClass({
  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(addressData),
    };
  }

render(){
  	return (
      <View style={styles.container}>
        <View style={styles.navBar} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          />
      </View>
    );
  }

_renderRow:(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void){
	return(
		<TouchableHighlight onPress={() => {

        }}>
		<View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
            <Text style={styles.text}>
              {addressData[rowID].name}
            </Text>
          </View>
        </View>
        </TouchableHighlight>
		);
}
};
const styles = StyleSheet.create({
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

module.exports = list;

import React, { Component } from 'react';
import g from '../Command/global.js'
import {featchAddress,selectedRowID} from '../Action/cityAction';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ListView,
    Image
} from 'react-native';
let addressData = require('../Store/address.json');
let rowHeight;
export default class CityList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(addressData),
        }
    }

    componentWillReceiveProps(nextProps) {
    // this.setState({
    //   // dataSource: this.ds.cloneWithRows(nextProps.result.items)
    // })
    console.log(nextProps.cityReducer);
  }

    render() {
      const { cityData } = this.props;
      console.log(cityData);
        return (
            <View style={styles.container}>
                <View style={{ width: 100, height: 18, backgroundColor: '#131313' }}></View>
                <ListView
                    renderRow = {this.renderRow}
                    automaticallyAdjustContentInsets = {false}
                    enableEmptySections = {true}
                    showsVerticalScrollIndicator={false}
                    dataSource = {this.state.dataSource}
                    />
            </View>
        );
    }

    renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
        let imageHeight = 50;
        if (rowID == 0) imageHeight = 70;
        return (
            <TouchableHighlight
                onPress ={() => {
                } }
                underlayColor = '#003a7a'
                >
                <View style={styles.row}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{addressData[rowID].name}</Text>
                </View>

            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 100,
        height: g.SHEIGHT,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#222122',
        height:50,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },

    contentBox: {
        height: 40,
    },

    firstRowText: {
        paddingTop: 25,
    },
});

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import Request from './Common/request.js';
// import List from './Section/list.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  ListView,
  Image,
  TouchableHighlight,
  Modal
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
let resultData = [];
let dailyData = [];
let dataSource;

class main extends Component {
  watchID: ?number = null;

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      initialPosition: 'unknow',
      lastPosition: 'unknow',
      province: '',
      timezone_offset: '',
      timezone: '',
      modalVisible: false,
      dataSource: ds.cloneWithRows([]),

    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert('Get location Error'),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({ lastPosition });
      let addressFromGeo = {};
      addressFromGeo = JSON.parse(lastPosition);
      this.parseGeocode(addressFromGeo);
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onFetch(address: string) {
    let requestURL = "https://api.thinkpage.cn/v3/weather/daily.json?key=o97r0fxvop12o8cx&location=" + address + "&language=zh-Hans&unit=c&start=0&days=5"
    return Request.get(requestURL, (response) => {
      daily = response.results[0].daily;
      daily.push(daily[0], daily[1]);
      this.setState({
        timezone: response.results[0].location.timezone,
        timezone_offset: response.results[0].location.timezone_offset
      })
      this.reloadListView();
    }, (error) => {
      alert('Im Fetch Error');
    });
  }

  parseGeocode(geoObjec: array) {
    let location = geoObjec['coords']['longitude'] + ',' + geoObjec['coords']['latitude'];
    let geoURL = "http://restapi.amap.com/v3/geocode/regeo?output=json&location=" + location + "&key=226fe1c151e83f47689ee4c35f2b1f39";
    return Request.get(geoURL, (response) => {
      let province = response['regeocode']['addressComponent']['city'];
      this.setState({ province: province });
      this.onFetch(province);
    }, (error) => {
      alert('Im parseGeoCode Error');
    });
  }

  reloadListView() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(daily),
    });
  }

  renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    let imagesURLPath = 'http://www.thinkpage.cn/weather/images/icons/3d_50/' + daily[rowID].code_day + '.png';
    return (
      <TouchableHighlight>
        <View style={styles.row}>
          <View style={styles.cellBox}><Text style={styles.contentTxt}>{daily[rowID].date}</Text></View>
          <View style={[styles.cellBox]} >
            <Image source={{ uri: imagesURLPath }} style={{ width: 20, height: 20, marginRight: 10, justifyContent: 'flex-start' }}/>
            <Text style={styles.contentTxt}>{daily[rowID].text_day}</Text>
          </View>

          <View style={styles.cellBox}><Text style={styles.contentTxt}>{daily[rowID].low}~{daily[rowID].high}</Text></View>
        </View>
      </TouchableHighlight>
    );
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setAnimationType(type) {
    this.setState({ animationType: type });
  }

  toggleTransparent() {
    this.setState({ transparent: !this.state.transparent });
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { alert("Modal has been closed.") } }
          >
        
        </Modal>

        <Image
          style={{ width: screenWidth, height: screenHeight }}
          source = {require('./images/bg.jpg') }>
          <View
            automaticallyAdjustContentInsets={true}
            style={styles.header}>
            <TouchableHighlight
              onPress = {() => {
                this.setModalVisible(true);
              } }
              >
              <View
                style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', paddingRight: 15 }}
                >
                <Image style={{ width: 20, height: 20 }} source = {require('./images/add.png') }></Image>
              </View>
            </TouchableHighlight>
            <Text style={[styles.listViewHeaderViewTextBase, styles.headerTitle]}>{this.state.province}</Text>
            <Text style={[styles.listViewHeaderViewTextBase]}>时区: {this.state.timezone}</Text>
            <Text style={styles.listViewHeaderViewTextBase}>Time_offset: {this.state.timezone_offset}</Text>
          </View>

          <View style={styles.listView}>
            <ListView
              automaticallyAdjustContentInsets = {false}
              dataSource = {this.state.dataSource}
              renderRow  = {this.renderRow}
              enableEmptySections = {true}
              />
          </View>
        </Image>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: screenWidth,
    height: 150,
    paddingTop: 40,
    backgroundColor: 'rgba(0,0,0,0)',
  },

  listViewHeaderViewTextBase: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: "white",
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 25,
    paddingBottom: 15
  },

  row: {
    flexDirection: 'row',
    padding: 0
  },

  cellBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },

  listView: {
    width: (screenWidth * 0.95),
    marginLeft: screenWidth * 0.025,
    backgroundColor: '#333',
    opacity: 0.7,
    borderRadius: 10,
  },

  contentTxt: {
    fontSize: 16,
    textAlign: 'center',
    color: '#ffffff',
  }

});
module.exports = main;

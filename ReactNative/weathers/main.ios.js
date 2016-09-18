
import React, { Component } from 'react';
import Dimensions from 'Dimensions'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  ListView,
  Image
} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth  = Dimensions.get('window').width;
let result = [];
let dataSource;

class main extends Component {
  watchID: ?number = null;

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        initialPosition : 'unknow',
        lastPosition : 'unknow',
        province : '',
        dataSource : ds.cloneWithRows(result),
    }
}

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
    },
      (error) => alert('Get location Error'),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lastPosition = JSON.stringify(position);
    this.setState({lastPosition});
    let addressFromGeo = {};
    addressFromGeo = JSON.parse(lastPosition);
    this.parseGeocode(addressFromGeo);
  });
}

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
}

  onFetch(address:string){
    let requestURL = "https://api.thinkpage.cn/v3/weather/daily.json?key=o97r0fxvop12o8cx&location="+address+"&language=zh-Hans&unit=c&start=0&days=5"
    fetch(requestURL)
                .then((response)=> response.text())
                .then((responseText)=> {
                  let resultData = JSON.parse(responseText);
                  result = resultData.results[0].daily;
                  this.reloadListView(result);
                })
                .catch((error)=> {
                  alert('onFetch Error');
                });
  }

    parseGeocode(geoObjec:array){
      let location = geoObjec['coords']['longitude'] + ',' + geoObjec['coords']['latitude'];
      let geoURL = "http://restapi.amap.com/v3/geocode/regeo?output=json&location="+location+"&key=226fe1c151e83f47689ee4c35f2b1f39";
      fetch(geoURL)
                  .then((response)=> response.text())
                  .then((responseText)=> {
                    let resultData = JSON.parse(responseText);
                    let province = resultData['regeocode']['addressComponent']['city'];
                    this.setState({province : province});
                    this.onFetch(province);
                  })
                  .catch((error)=> {
                    alert('RequestGeocode Error');
                  });
    }

    reloadListView(data){
      this.setState({
          dataSource : this.state.dataSource.cloneWithRows(data),
      });
    }

  renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    let imagesURLPath = 'http://www.thinkpage.cn/weather/images/icons/3d_50/'+result[rowID].code_day+'.png';
    return(
    			<TouchableHighlight>
          <View style={styles.row}>
    					<View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].date}</Text></View>
              <View style={[styles.cellBox]} >
                <Image source={{uri:imagesURLPath}} style={{width:20,height:20,marginRight:10,justifyContent:'flex-start'}}/>
                <Text style={styles.contentTxt}>{result[rowID].text_day}</Text>
              </View>

              <View style={styles.cellBox}><Text style={styles.contentTxt}>{result[rowID].low} ~ {result[rowID].high}</Text></View>
          </View>
    			</TouchableHighlight>
    		);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setAnimationType(type) {
    this.setState({animationType: type});
  }

  toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          style={{width:screenWidth,height:screenHeight}}
          source = {require('./images/bg.jpg')}>
          <View
            automaticallyAdjustContentInsets={true}
            style={styles.header}>
                  <TouchableHighlight>
                  <View
                  style={{flex:1,alignItems:'flex-end',justifyContent:'flex-end',paddingRight:15}}
                  >
                  <Image style={{width:20,height:20}} source = {require('./images/add.png')}></Image>
                  </View>
                  </TouchableHighlight>

                  <Text style={[styles.listViewHeaderViewTextBase, styles.headerTitle]}>{this.state.province}</Text>
                  <Text style={[styles.listViewHeaderViewTextBase]}>时区:"Asia/Shanghai"</Text>
                  <Text style={styles.listViewHeaderViewTextBase}>Time_offset:"+08:00"</Text>
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
  container:{
    flex:1,
  },

  header: {
  width:screenWidth,
  height:150,
  paddingTop:40,
  backgroundColor: 'rgba(0,0,0,0)',
 },

  listViewHeaderViewTextBase:{
     backgroundColor: 'rgba(0,0,0,0)',
     color:"white",
     textAlign:"center",
     fontSize:14,
     paddingBottom:10,
   },

  headerTitle:{
    fontSize:25,
    paddingBottom:15
    },

  row:{
    flexDirection:'row',
    padding : 0
  },

  cellBox:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40
  },

  listView:{
    width:(screenWidth *0.95),
    marginLeft:screenWidth * 0.025,
    backgroundColor:'#333',
    opacity:0.7,
    borderRadius:10,
  },

  contentTxt:{
    fontSize:16,
    textAlign:'center',
    color:'#ffffff',
  }

});
module.exports = main;

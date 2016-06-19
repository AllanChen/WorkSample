'use strict';

var React = require('react');
var {
  StyleSheet,
  Text,
  View,
  Component,
  TouchableHighlight
} = require('react-native');

var GiftedListView = require('react-native-gifted-listview');
var RowView = require('./rowview.ios.js');

var ExampleTableView = React.createClass({
_onFetch(page = 1, callback, options) {

  var returnString = '{"error":0,"status":"success","date":"2016-06-19","results":[{"currentCity":"北京","pm25":"83","index":[{"title":"穿衣","zs":"炎热","tipt":"穿衣指数","des":"天气炎热，建议着短衫、短裙、短裤、薄型T恤衫等清凉夏季服装。"},{"title":"洗车","zs":"较适宜","tipt":"洗车指数","des":"较适宜洗车，未来一天无雨，风力较小，擦洗一新的汽车至少能保持一天。"},{"title":"旅游","zs":"较适宜","tipt":"旅游指数","des":"天气较好，感觉有点热，不过有微风伴您一路同行，还是较适宜旅游的，外出请注意防晒哦！"},{"title":"感冒","zs":"少发","tipt":"感冒指数","des":"各项气象条件适宜，发生感冒机率较低。但请避免长期处于空调房间中，以防感冒。"},{"title":"运动","zs":"较适宜","tipt":"运动指数","des":"天气较好，户外运动请注意防晒，推荐您在室内进行低强度运动。"},{"title":"紫外线强度","zs":"强","tipt":"紫外线强度指数","des":"紫外线辐射强，建议涂擦SPF20左右、PA++的防晒护肤品。避免在10点至14点暴露于日光下。"}],"weather_data":[{"date":"周日 06月19日 (实时：23℃)","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/qing.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/qing.png","weather":"晴","wind":"微风","temperature":"33 ~ 20℃"},{"date":"周一","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/leizhenyu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/duoyun.png","weather":"雷阵雨转多云","wind":"微风","temperature":"30 ~ 22℃"},{"date":"周二","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/leizhenyu.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/leizhenyu.png","weather":"雷阵雨","wind":"微风","temperature":"30 ~ 22℃"},{"date":"周三","dayPictureUrl":"http://api.map.baidu.com/images/weather/day/duoyun.png","nightPictureUrl":"http://api.map.baidu.com/images/weather/night/yin.png","weather":"多云转阴","wind":"微风","temperature":"32 ~ 24℃"}]}]}';
  var returnData = eval("(" + returnString + ")");  
  var rows = [];
  var loopArray = returnData.results[0].index;
  for(var i in loopArray){
    rows.push([loopArray[i].des]);
    // rows.push("1");
  }
  
  callback(rows);
  // fetch('http://api.map.baidu.com/telematics/v3/weather?location=%E5%8C%97%E4%BA%AC&output=json&ak=sZvXrnY0LsGnucNksCdH73dUAre5FKMD')
  //   .then((response) => response.text())
  //   .then((responseText) => {
  //     var returnData = eval("(" + responseText + ")");  
  //     var rows = [];
  //     var loopArray = returnData.results[0].index;
  //     for(var i in loopArray)
  //       rows.push([i, loopArray[i]]);

  //      // console.log("---"+datas.results[0]+"---");
  //     // var rows = eval('(' + datas.results + ')');
    
  //     callback(rows);
  //   })
  //   .catch((error) => {
  //     // console.warn(error);
  //     alert(error);
  //   });

//     setTimeout(() => {
//       // var header = 'Header';
//       // var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
// //       var header = 'Header '+page;
// //       var rows = {};
// //       rows[header] = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
//       if (page === 3) {
//         callback(rows, {
//           allLoaded: true, // the end of the list is reached
//         });        
//       } else {
//         callback(rows);
//       }
//     }, 1000); // simulating network fetching
  },
  
  _renderRowView(rowData){
    return(
      <TouchableHighlight
        style = {styles.row}
        underlayColor = 'red'
        onPress = {() => this._onPress(rowData)}>
      <Text
      style = {styles.rowText}
      >{rowData}</Text>
      </TouchableHighlight>
    );
  },
  
  _renderLoadMoreView(){
    return(
      <TouchableHighlight
        style = {styles.load_more_view}
        >
      <Text>LoadMore</Text>
      </TouchableHighlight>
    );
  },

  _renderCoustomLoadMoreView(rowData){
     return <RowView />
  },
        
  _onPress(rowData){
    console.log(rowData+' pressed');
//     alert(1)
  },

  render(){
      return(
      <View style={styles.container}>
        <View style={styles.navBar} />        
        <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          onPress={this._onPress}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          paginationWaitingView = {this._renderCoustomLoadMoreView}
          // paginationWaitingView = {this._renderLoadMoreView}
          // customStyles={{
          //   paginationView: {
          //     backgroundColor: 'red',
          //   },
          // }}
          refreshableTintColor="blue"
        ></GiftedListView>
      </View>
      )
  }
});

var styles = {
  container: {
    flex: 1,
    backgroundColor: '#CCC',
  },
  navBar: {
    height: 64,
    backgroundColor: '#CCC'
  },
  row: {
    padding: 10,
    height: 80,

  },
  rowText:{
    fontSize:20,
    backgroundColor :'#CCC'
  },
  load_more_view:{
    height: 88,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,
  }
};
module.exports = ExampleTableView;
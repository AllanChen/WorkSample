import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import g from '../Config/config.js'
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
let oneDayWeatherArray = [];
let weekInfoDayByDayArray = [];
let windInfoArray = [];
let oneDayWeatherArrayLength;
let weekInfoDayByDayArrayLength;
export default class pageTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oneDayWeatherArrayLength: 0,
            weekInfoDayByDayArrayLength: 0
        }
        this.renderDayWeather();
        this.renderWeekWeather();
        this.renderWindInfo();
        this.updateState();
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={styles.timeWeather}>
                    {oneDayWeatherArray}
                </ScrollView>

                <View style={styles.weekInfo}>{weekInfoDayByDayArray}</View>

                <View style={styles.wind}>{windInfoArray}</View>

                <View style={styles.life}>
                    <View style={{width:g.SWIDTH,height:15}}><Text>生活指数</Text></View>
                    <View>
                        <Image
                            style={{ width: 50, height: 50, paddingLeft: 10 }}
                            source={require('../images/weather/33.png') }
                            />
                        <Text>9月27日\n</Text>
                    </View>
                    <View>
                        <Image
                            style={{ width: 50, height: 50, paddingLeft: 10 }}
                            source={require('../images/weather/33.png') }
                            />
                        <Text>9月27日\n</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderDayWeather() {
        let times;
        for (var index = 0; index < 10; index++) {
            times = Math.floor(Math.random() * (23 - 0 + 1) + 0);
            oneDayWeatherArray.push(
                <View style={styles.weekInfo_daybyday}>
                    <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>{times}时</Text>
                    <Image
                        style={{ width: 40, height: 40, paddingTop: 10, paddingBottom: 10 }}
                        source={require('../images/weather/7.png') }
                        />
                    <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>{times}℃</Text>
                </View>
            );
        }
    }

    renderWeekWeather() {
        for (var index = 0; index < 6; index++) {
            weekInfoDayByDayArray.push(
                <View style={styles.weekInfo_daybyday}>
                    <Text style={[styles.textStyle, { paddingTop: 5, paddingBottom: 5, paddingLeft: 3 }]}>周一</Text>
                    <Text style={[styles.textStyle, { paddingBottom: 5 }]}>09/29</Text>
                    <Image
                        style={{ width: 30, height: 30, paddingTop: 10, paddingBottom: 10 }}
                        source={require('../images/weather/8.png') }
                        />
                    <Text style={[styles.textStyle, { paddingTop: 5 }]}>大雨</Text>
                    <Text style={[styles.textStyle, { paddingTop: 10 }]}>30℃</Text>
                    <Text style={[styles.textStyle]}>|</Text>
                    <Text style={[styles.textStyle, { paddingTop: 3 }]}>20℃</Text>
                    <Text style={[styles.textStyle, { paddingTop: 10, paddingBottom: 10 }]}>小雨</Text>
                    <Image
                        style={{ width: 30, height: 30 }}
                        source={require('../images/weather/19.png') }
                        />
                </View>
            );
        }
    }

    renderWindInfo() {
        for (var index = 0; index < 6; index++) {
            windInfoArray.push(
                <View style={styles.weekInfo_daybyday}>
                    <Text style={[styles.textStyle, { paddingTop: 5, paddingBottom: 5, paddingLeft: 3 }]}>北风</Text>
                    <Text style={[styles.textStyle, { fontSize: 10, paddingBottom: 5 }]}>4级</Text>
                    <Image
                        style={{ width: 30, height: 30, paddingTop: 10, paddingBottom: 10 }}
                        source={require('../images/weather/32.png') }
                        />
                    <Text style={[styles.textStyle, { paddingTop: 5, fontSize: 10 }]}>0%</Text>
                </View>
            );
        }
    }

    updateState() {
        this.setState({
            weekInfoDayByDayArrayLength: weekInfoDayByDayArray.length,
            oneDayWeatherArrayLength: oneDayWeatherArray.length
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timeWeather: {
        height: 80,
        width: 70 * oneDayWeatherArrayLength,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,.3)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },

    weekInfo: {
        width: g.SWIDTH,
        height: 230,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },

    weekInfo_daybyday: {
        width: g.SWIDTH / 6,
        height: 100,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
    },

    wind: {
        width: g.SWIDTH,
        height: 135,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        marginTop: 10,
    },
    life:{
        width:g.SWIDTH,
        height:200,
    },
    textStyle: {
        color: '#ffffff',
    },
})

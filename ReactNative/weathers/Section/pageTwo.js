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
                    style={{width:g.SWIDTH}}
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={styles.timeWeather}>
                    {oneDayWeatherArray}
                </ScrollView>

                <View style={styles.weekInfo}>{weekInfoDayByDayArray}</View>

                <View style={styles.wind}>{windInfoArray}</View>

                <View style={styles.life}>
                    <View style={{
                        width: g.SWIDTH, height: 30, paddingLeft: 10, justifyContent: 'center', borderBottomWidth: 1, borderTopWidth: 1, borderColor: 'rgba(255,255,255,.3)',
                    }}><Text style={[styles.textStyle, { fontSize: 15, }]}>生活指数</Text></View>

                    <View style={{ flexDirection: 'row', width: g.SWIDTH, paddingTop: 5, height: 55 }}>
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40, paddingLeft: 10 }]}
                                source={require('../images/weather/33.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View >
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40 }]}
                                source={require('../images/weather/34.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: g.SWIDTH, paddingTop: 5 }}>
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40, paddingLeft: 10 }]}
                                source={require('../images/weather/33.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View >
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40 }]}
                                source={require('../images/weather/34.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', width: g.SWIDTH, paddingTop: 5 }}>
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40, paddingLeft: 10 }]}
                                source={require('../images/weather/33.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View >
                        <View style={{ width: g.SWIDTH * 0.5, flexDirection: 'row', justifyContent: 'center' }}>
                            <Image
                                style={[styles.pl5, { width: 40, height: 40 }]}
                                source={require('../images/weather/34.png') }
                                />
                            <Text style={[styles.textStyle, { textAlign: 'center', lineHeight: 19 }]}>9月27日 {"\n"} 农历八月二十七</Text>
                        </View>
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
                    <Text style={[styles.textStyle, { fontSize: 10 }]}>4级</Text>
                    <Image
                        style={{ width: 30, height: 30, paddingTop: 10 }}
                        source={require('../images/weather/32.png') }
                        />
                    <Text style={[styles.textStyle, { fontSize: 10 }]}>0%</Text>
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
        height: 95,
        width: 70 * oneDayWeatherArrayLength,
        // width: g.SWIDTH,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,.3)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },

    weekInfo: {
        width: g.SWIDTH,
        height: 225,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },

    weekInfo_daybyday: {
        width: g.SWIDTH / 6,
        height: 200,
        flexDirection: 'column',
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
    },

    wind: {
        width: g.SWIDTH,
        height: 90,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
    },
    life: {
        width: g.SWIDTH,
        height: 180,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    textStyle: {
        color: '#ffffff',
    },
    pt5: {
        paddingTop: 5
    },
    pb5: {
        paddingBottom: 5
    },
    pl5: {
        paddingLeft: 5
    }

})

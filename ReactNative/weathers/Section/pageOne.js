import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

export default class pageOne extends Component {
    constructor(props) {
        super(props);
    }

     show(){
        alert('page');
    }

    render() {
        return (
            <View>
            <View style={styles.todayInfo}>
                            <Text style={{ textAlign: 'left', color: '#ffffff', fontSize: 170, paddingLeft: 10 }}>30</Text>
                            <Text style={{ textAlign: 'left', color: '#ffffff', fontSize: 30, paddingTop: 15 }}>℃</Text>
                        </View>

                        <View style={styles.tempeture}>
                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require('../images/weather/1.png') } />
                            <Text style={{ color: '#ffffff', fontSize: 20, paddingLeft: 10 }}>多云 26～35℃</Text>
                        </View>

                        <View style={styles.todayCityInfo}>
                            <Image
                                style={{ width: 25, height: 25 }}
                                source={require('../images/low_temperature.png') }/>
                            <Text style={[styles.textStyle, { fontSize: 15 }]}>体感30℃</Text>

                            <Image
                                style={{ width: 30, height: 30, paddingLeft: 20 }}
                                source={require('../images/weather/99.png') }/>
                            <Text style={[styles.textStyle, { fontSize: 15 }]}>轻度污染</Text>
                        </View>

                        <View style={styles.pageOneButtom}>
                            <View style={styles.weatherBox}>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>明天</Text>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>23/29 ℃</Text>
                                <Image
                                    style={{ width: 40, height: 40, paddingTop: 10, paddingBottom: 10 }}
                                    source={require('../images/weather/7.png') }
                                    />
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>大雨</Text>
                            </View>

                            <View style={styles.weatherBox}>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>明天</Text>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>23/29 ℃</Text>
                                <Image
                                    style={{ width: 40, height: 40, paddingTop: 10, paddingBottom: 10 }}
                                    source={require('../images/weather/7.png') }
                                    />
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>大雨</Text>
                            </View>

                            <View style={styles.weatherBox}>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>明天</Text>
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>23/29 ℃</Text>
                                <Image
                                    style={{ width: 40, height: 40, paddingTop: 10, paddingBottom: 10 }}
                                    source={require('../images/weather/7.png') }
                                    />
                                <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>大雨</Text>
                            </View>
                        </View>

            </View>            
            )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    bgImage: {
        width: swidth,
        height: sheight
    },

    headView: {
        paddingTop: 30,
        width: swidth,
        height: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },

    scrollViewStyle: {
        flex: 1,
        flexDirection: 'column',
    },

    todayInfo: {
        paddingTop: 30,
        height: 200,
        width: swidth,
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'row',
        flex: .4,
    },

    tempeture: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: swidth * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18,
        marginTop: 10,
        flex: .3,
    },

    todayCityInfo: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: swidth * 0.8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        paddingLeft: 18,
    },

    pageOneButtom: {
        backgroundColor: 'rgba(0,0,0,0)',
        width: swidth,
        height: 150,
        marginTop: 195,
        flexDirection: 'row',
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,.3)',
    },

    weatherBox: {
        backgroundColor: 'rgba(0,0,0,0)',
        paddingTop: 5,
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    fs15: {
        fontSize: 18,
    },

    pt5: {
        paddingTop: 5
    },

    pb5: {
        paddingBottom: 5,
    },

    textStyle: {
        color: '#ffffff',
    }
})
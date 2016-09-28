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
export default class pageTwo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let times; 
        let weatherBox = [];
        for (var index = 0; index < 10; index++) {
            times = Math.floor(Math.random() * (23 - 0 + 1) + 0);
            weatherBox.push(
                <View style={styles.weatherBox}>
                    <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>{times}时</Text>
                    <Image
                        style={{ width: 40, height: 40, paddingTop: 10, paddingBottom: 10 }}
                        source={require('../images/weather/7.png') }
                        />
                    <Text style={[styles.textStyle, styles.fs15, styles.pt5, styles.pb5]}>{times}℃</Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    automaticallyAdjustContentInsets={false} 
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    contentContainerStyle={styles.timeWeather}
                    >
                    {weatherBox}
                </ScrollView>
                <View style={styles.weekWeather}>
                    <View style={styles.weekInfo}></View>
                    <View style={styles.weekTempeature}></View>
                    <View style={styles.weekInfoBottom}></View>
                </View>

                <View style={styles.wind}></View>
            </View>
        )
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    timeWeather: {
        height: 80,
        width: 70*10,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,.3)',
        borderBottomWidth:1,
        borderBottomColor: 'rgba(255,255,255,.3)',
    },
    weekWeather: {},
    weekInfo: {},
    weekTempeature: {},
    weekInfoBottom: {},
    wind: {},
    weatherBox: {
        backgroundColor: 'rgba(0,0,0,0)',
        flexDirection: 'column',
        alignItems: 'center',
        width:70,
    },
    textStyle: {
        color: '#ffffff',
    },
})

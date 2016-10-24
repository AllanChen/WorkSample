import React, { Component } from 'react';
import PageOne from './PageOne'
import g from '../Command/global.js'
import Drawer from 'react-native-drawer'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
const Main = React.createClass({
    render(){
        return(
            <Image
                style={styles.bgImage}
                source = {require('../Img/bg.jpg') }
                >
            <Drawer
                    ref={(ref) => this._drawer = ref}
                    type="displace"
                    content={ <PageOne /> }
                    tapToClose={true}
                    openDrawerOffset={0.7} // 20% gap on the right side of drawer
                    panCloseMask={0.7}
                    >

                    <View style={styles.headView}>
                        <TouchableHighlight
                            onPress = {() => {
                                this._drawer.open();
                            } }
                            underlayColor = 'rgba(0,0,0,0)'
                            >
                            <Image style={{ width: 20, height: 20, marginLeft: 10 }} source = {require('../Img/add.png') }></Image>
                        </TouchableHighlight>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 18 }}> 广州 </Text>
                        <View style={{ width: 20, height: 20 }}></View>
                    </View>
                    <View style={styles.scrollViewContainer}>
                        <ScrollView
                            automaticallyAdjustContentInsets={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            pagingEnabled = {true}
                            >

                            <ScrollView
                                automaticallyAdjustContentInsets={false}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainer}>
                                <PageOne />
                            </ScrollView>

                            <ScrollView
                                automaticallyAdjustContentInsets={false}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.contentContainer}>
                                <PageOne />
                            </ScrollView>
                        </ScrollView>
                    </View>
                </Drawer>

            </Image>
        );
    }

});

const styles = StyleSheet.create({
    scrollViewContainer: {
        height: g.SHEIGHT - 50,
        backgroundColor: 'rgba(0,0,0,0)',
    },

    bgImage: {
        width: g.SWIDTH,
        height: g.SHEIGHT,
    },

    headView: {
        backgroundColor: "rgba(0,0,0,0)",
        flexDirection: 'row',
        width: g.SWIDTH,
        marginTop: 25,
        height: 25,
        justifyContent: 'space-between'
    },

    contentContainer: {
        backgroundColor: "rgba(0,0,0,0)",
    },

    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3,  },
    main: { paddingLeft: 3 },
});
export default Main;
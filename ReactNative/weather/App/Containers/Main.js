import React, { Component } from 'react';
import g from '../Command/global.js'
import Drawer from 'react-native-drawer'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  
} from 'react-native';
const Main = React.createClass({
    constructor(props) {
        super(props);
    },
    
    render(){
        return(
            <Image style={styles.bgImage} source = {require('../Img/bg.jpg') }>
                <Text>This is container Inside</Text>
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
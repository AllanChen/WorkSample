import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Dimensions from 'Dimensions';
import PageOne from './Section/pageOne.js'
import PageTwo from './Section/pageTwo.js'
import g from './Config/config.js'
class start extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image
                style={styles.bgImage}
                source = {require('./images/bg.jpg') }
                >
                <View style={styles.headView}>
                    <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 23 }}> 广州 </Text>
                </View>
                <View style={styles.scrollViewContainer}>
                    <ScrollView
                        automaticallyAdjustContentInsets={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}>
                        <PageOne />  
                        <PageTwo />         
                    </ScrollView>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        height: g.SHEIGHT,
        backgroundColor: 'rgba(0,0,0,0)',
        marginTop:15,
    },

    bgImage: {
        width: g.SWIDTH,
        height: g.SHEIGHT,
    },

    headView: {
        paddingTop: 30,
        width: g.SWIDTH,
        height: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
    },

    contentContainer: {
        backgroundColor: "rgba(0,0,0,0)",
    }
});
module.exports = start;
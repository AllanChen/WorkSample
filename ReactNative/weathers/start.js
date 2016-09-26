import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import PageOne from './Section/pageOne.js'
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

class start extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source = {require('./images/bg.jpg') }
                    >
                    <View style={styles.headView}>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 23 }}> 广州 </Text>
                    </View>

                    <ScrollView style={styles.scrollViewStyle}>
                        <PageOne />
                    </ScrollView>
                </Image>
            </View>
        );
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

});
module.exports = start;
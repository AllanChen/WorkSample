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
const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

class start extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
                        showsVerticalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.contentContainer}>
                        <PageOne />
                        <PageOne />
                    </ScrollView>
                </View>
            </Image>
        );
    }


}

const styles = StyleSheet.create({
    scrollViewContainer: {
        height: sheight,
        backgroundColor: 'rgba(0,0,0,0)',
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

    contentContainer: {
        backgroundColor: "rgba(0,0,0,0)",
    }
});
module.exports = start;
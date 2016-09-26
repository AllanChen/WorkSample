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
import AddPaging from 'react-native-paged-scroll-view'
// var PagedScrollView = AddPaging(ScrollView)
const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

class start extends Component {
    constructor(props) {
        super(props);
    }

// handlePageChange (state) {
//     console.log('current horizontal page:', state.currentHorizontalPage)
//     console.log('current vertical page:  ', state.currentVerticalPage)
//     console.log('total horizontal pages: ', state.totalHorizontalPages)
//     console.log('total vertical pages:   ', state.totalVerticalPages)
//   }
    render() {
        return (
            <View style={styles.container}>
                <Image
                    source = {require('./images/bg.jpg') }
                    >
                    <View style={styles.headView}>
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 23 }}> 广州 </Text>
                    </View>
                    /*
                    <ScrollView style={styles.scrollViewStyle}
                                automaticallyAdjustContentInsets={false}
                                horizontal = {false}
                                vertical = {true}
                                pagingEnabled = {true}
                                showsVerticalScrollIndicator={true}
                                showsHorizontalScrollIndicator={false}                        
                                contentContainerStyle={{height: sheight-20, alignItems: 'flex-start'}}
                                ref="scrollView"
                    >
                        <PageOne />
                        <PageOne />
                    </ScrollView>
                    */
                    // <PagedScrollView onPageChange={this.handlePageChange.bind(this)}>
                    //     <PageOne />
                    //     <PageOne />
                    // </PagedScrollView>
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
        flex:1,
        flexDirection: 'column',
        height:sheight-20,
    },

});
module.exports = start;
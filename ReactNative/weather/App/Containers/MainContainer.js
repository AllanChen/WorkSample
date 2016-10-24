import React, { Component } from 'react';
import {connect} from 'react-redux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Text> this is a maninContainer</Text>
        );
    }
};

export default connect((state) => {
    const { cityReducer } = state;
    return {
        cityReducer
    }
})(MainContainer);
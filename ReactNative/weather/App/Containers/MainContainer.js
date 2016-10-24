import React, { Component } from 'react';
import {connect} from 'react-redux';
import {cityAction} from '../Action/cityAction';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  InteractionManager
} from 'react-native';
import {featchAddress} from '../Action/cityAction';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

  componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, cityReducer} = this.props;
            dispatch(featchAddress(0,0));
        });
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
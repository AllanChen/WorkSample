import React, { Component } from 'react';
import {connect} from 'react-redux';
import Main from  './Main';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  InteractionManager
} from 'react-native';
class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Main {...this.props} />
        );
    }
};

export default connect((state) => {
    const { mainReducer } = state;
    return {
        mainReducer
    }
})(MainContainer);

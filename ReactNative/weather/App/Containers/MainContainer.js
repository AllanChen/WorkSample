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
import {featchAddress,selectedRowID} from '../Action/cityAction';

class MainContainer extends Component {
    constructor(props) {
        super(props);
    }

  componentDidMount() {
      var result = [];
        InteractionManager.runAfterInteractions(() => {
          const {dispatch} = this.props;
            dispatch(selectedRowID(0));
        });

    }

    render(){
        console.log("---------"+this.props.cityReducer);
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

import React, { Component } from 'react';
import {connect} from 'react-redux';
import CityList from  './CityList';
import {featchAddress,selectedRowID} from '../Action/cityAction';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  InteractionManager
} from 'react-native';

class CityListContainer extends Component {
    constructor(props) {
        super(props);
        const { dispatch }  = this.props;
        dispatch(featchAddress(0,0));
    }

    render(){
        return(
            <CityList {...this.props}/>
        );
    }
};
export default connect((state) => {
    const { cityReducer } = state;
    return {
        cityReducer
    }
})(CityListContainer);

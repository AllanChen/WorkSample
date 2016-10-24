import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import MainContainer from './Containers/MainContainer';
class App extends Component {
    render() {
        return (
            <MainContainer {...this.props} />
        )
    }
}
export default App;
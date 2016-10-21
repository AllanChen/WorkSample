import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';

import Main from './Containers/Main';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                 <Main />
            </Provider>
        )
    }
}

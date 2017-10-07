import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App.js';
import { Provider } from 'react-redux';
import store, { history } from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
    document.getElementById('root')
);
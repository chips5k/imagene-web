import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from '../store/store';
import Layout from './components/Layout';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Generation from './components/Generation';

import { createGeneration } from './actions.js';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

// newGeneration(e) {
//     e.preventDefault();
//     this.props.createGeneration();
//     this.props.push('/generations/1');
// }

export default function App(props) {
    return (
        <Provider store={store}>
            { /* ConnectedRouter will use the store from Provider automatically */ }
            <ConnectedRouter history={history}>
            <Layout>
                <Sidebar />
                <Route exact path="/" component={Home}/>
                <Route exact path="/generation/:id?" component={Generation}/>
            </Layout>
            </ConnectedRouter>
        </Provider>
    );
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    createGeneration,
    push
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
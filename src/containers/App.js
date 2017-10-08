import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Sidebar from '../containers/Sidebar';
import Generation from '../containers/Generation';
import { Provider } from 'react-redux';
import store, { history } from '../store/store';

export default function App(props) {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Sidebar />
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/generation/:id" component={Generation} />
                </Layout> 
            </ConnectedRouter>
        </Provider>
    );
}


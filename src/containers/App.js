import React from 'react';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import Layout from '../components/Layout';
import Home from '../components/Home';
import Sidebar from '../components/Sidebar';
import Generation from '../components/Generation';
import * as actionCreators from '../actions/actions';
import { connect } from 'react-redux';


function App(props) {
    return (
        <ConnectedRouter history={props.history}>
            <Layout>
                <Sidebar location={props.location} generations={props.generations} />
                <Route exact path="/" component={Home}/>
                <Route exact path="/generation/:id?" component={Generation}/>
            </Layout> 
        </ConnectedRouter>
    );
}

const mapStateToProps = (state, ownProps) => {
    
    return {
        ...state,
        location: ownProps.history.location.pathname
    }
    
};

const mapDispatchToProps = {
    ...actionCreators
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
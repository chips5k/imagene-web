import React, { Component } from 'react';
import { Route } from 'react-router-dom'

import initReactFastclick from 'react-fastclick';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


//Our components
import Layout from '../components/app/layout';
import GenerationViewContainer from './GenerationViewContainer';
import HomeView from '../components/app/views/HomeView';

class AppContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sidebarVisible: false
        }
    }

    componentDidMount() {
        initReactFastclick();
    }

    handleNavSidebarToggleClick(e) {
        e.preventDefault();
        this.refs.layout.toggleNavSidebar();
    }

    handleNavSidebarLinkClick(url, e) {
        e.preventDefault(e);
        console.log(this.props.actionCreators);
        if(url === '/new-generation') {
            this.props.actionCreators.createInitialGeneration();
        } else {
            this.props.actionCreators.redirect(url);
        }
    }

    render() {
        return (
            <Layout
                ref="layout"
                onToggleClick={this.handleSidebarToggleClick} 
                onBlockerClick={this.handleSidebarToggleClick}
                visible={this.state.sidebarVisible} 
                generations={this.props.generations}
                location={this.props.location}
                onSidebarLinkClick={this.handleNavSidebarLinkClick.bind(this)}
            >
                <Route exact path="/" render={ ({match}) => 
                    <HomeView match={match} onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)} />
                }/>
                <Route exact path="/generation/:id" render={ ({match}) => 
                    <GenerationViewContainer 
                        match={match}
                        onNavSidebarToggleClick={this.handleNavSidebarToggleClick.bind(this)}
                        actionCreators={this.props.actionCreators}
                    />
                }/>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    generations: Object.values(state.generations.byId),
    location: state.router.location.pathname
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    actionCreators: bindActionCreators(ownProps.actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
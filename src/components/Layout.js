import React, { Component } from 'react';
import 'roboto-fontface';
import 'font-awesome/css/font-awesome.css';
import '../assets/css/index.css';
import { Route } from 'react-router';

//Our containers
import Generation from '../containers/Generation';
import Home from '../containers/Home';
import Sidebar from '../containers/Sidebar';
class Layout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            manualToggle: false,
            sidebar: window.innerWidth >= 1224
        };

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        if(window.innerWidth > 1224) {
            if(this.state.manualToggle === false) {
                this.setState({
                    sidebar: true
                });
            }
        } else {
            if(this.state.manualToggle === false) {
                this.setState({
                    sidebar: false
                });
            }
        }
    };

    toggleSidebar(e) {
        e.preventDefault();

        //Determine if user has reverted to default state, and clear the manual toggle state
        let manualToggle = true;
        if(window.innerWidth >= 1224 && this.state.sidebar === false) {
            manualToggle = false;
        };

        if(window.innerWidth < 1224 && this.state.sidebar === true) {
            manualToggle = false;
        }

        this.setState({
            manualToggle: manualToggle,
            sidebar: !this.state.sidebar
        });
    }

    render() {
        return (
            <div>
                <div className={`container ${this.state.sidebar ? '' : 'sidebar-offscreen'}`}>
                    <Sidebar toggleSidebar={this.toggleSidebar.bind(this)} {...this.props}  />
                    {/* explicitly calling render on these routes in order to pass the match object to the routed component */}
                    <Route exact path="/" render={({ match }) => <Home match={match} toggleSidebar={this.toggleSidebar.bind(this)} {...this.props} />}  />
                    <Route exact path="/generation/:id" render={({ match }) => <Generation match={match} toggleSidebar={this.toggleSidebar.bind(this)} {...this.props}/>} />
                </div>
                
            </div>
        );
    }
}
export default Layout;
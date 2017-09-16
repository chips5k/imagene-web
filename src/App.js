import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


class App extends Component {
    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography type="title" color="inherit" style={{ flex: 1 }}>
                            ImageneWeb
                        </Typography>
                        <IconButton color="contrast" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                
                {this.props.children}
            </div>
        );
    }
};

const mapStateToProps = function(state) {
    return state;
};

const mapDispatchToProps = function(dispatch) {
    return {
        onClickLink: function(e) {
            console.log(this);
            e.preventDefault();
            return {
                type: 'TESTING',
                action: { some: 'crap' }
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
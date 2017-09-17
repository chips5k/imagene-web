import React, { Component } from 'react';
import { connect } from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import HomeIcon from 'material-ui-icons/Home';
import { withStyles } from 'material-ui/styles';
import MenuIcon from 'material-ui-icons/Menu';
import { Link } from 'react-router-dom';


const styles = theme => ({
    root: {
      marginTop: theme.spacing.unit * 8,
      width: '100%',
    },
    title: {
      flex: 1,
      textDecoration: 'none'
    },
    menuButton: {
      marginLeft: -12,
    },
  });

class App extends Component {
    render() {
        return (
            <div className={this.props.classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton component={Link} to="/" className={this.props.classes.menuButton} color="contrast" aria-label="Menu">
                            <HomeIcon  />
                        </IconButton>
                        <Typography component={Link} to="/" type="title" color="inherit" className={this.props.classes.title}>
                            Imagene
                        </Typography>

                        <Button color="contrast" component={Link} to="/evolve">New Population</Button>
                        <Button color="contrast" component={Link} to="/evolve">Current Population</Button>
                        <Button color="contrast" component={Link} to="/import">Import Population</Button>
                    </Toolbar>
                </AppBar>
                
                {this.props.children}
            </div>
        );
    }
};



export default withStyles(styles)(App);

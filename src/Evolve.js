import React, { Component } from 'react';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  paper: {
    zIndex: 1000,
    borderLeft: '1px solid #ccc',
    paddingTop: '100px',
    minWidth: '320px'
  },
  drawerHeader: theme.mixins.toolbar,
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});


  
class Evolve extends Component {

    render() {
        return (
            <div>
                <Drawer type="permanent" anchor="right" classes={{
                    docked: this.props.classes.docked,
                    paper: this.props.classes.paper,
                }}>
                    <div>
                    <h2>Population</h2>
                    </div>

                    <div>
                    <h3>Generation 1</h3>
                    </div>

                    <div>
                    <h3>Generation 2</h3>
                    </div>
                </Drawer>

            </div>
        );
    }
}

export default withStyles(styles)(Evolve);
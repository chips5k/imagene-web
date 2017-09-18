import React, { Component } from 'react';

import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import sample1 from "./img/samples/1.png";
import AddIcon from 'material-ui-icons/Add';
import OpenInBrowserIcon from 'material-ui-icons/OpenInBrowser';
import { Link } from 'react-router-dom';

const styles = theme => ({
    home: {
        padding: theme.spacing.unit * 3
    }
});

  
class Home extends Component {

    
    render() {
        return (
            <Grid container className={this.props.classes.home}>
                <Grid item sm={8} xs={12}>
                    <Typography type="display1" gutterBottom>
                        Welcome
                    </Typography>
                    <Typography type="body1" gutterBottom style={{marginBottom: '1rem'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget ante vitae massa convallis efficitur. Sed mattis, tortor et dapibus aliquet, nisi dui pharetra quam, posuere vehicula purus sem sed eros. Nam sed urna placerat, mattis orci vitae, tempor libero. Quisque non mauris id nisl sagittis pretium a et magna. Nullam non malesuada metus, in gravida erat. Nunc maximus tincidunt velit et lobortis. Nulla faucibus volutpat diam eu ultrices. Praesent porta aliquam fermentum. Aenean at pharetra justo. Quisque urna risus, mattis sit amet lacinia id, imperdiet ut arcu. Aenean ac interdum eros. Aliquam sit amet egestas nulla. Integer orci turpis, ornare et laoreet sed, dapibus ac diam. Nullam volutpat massa sit amet nunc mattis ullamcorper. Integer aliquam tempor sollicitudin.
                    </Typography>
                    <Typography type="body1" gutterBottom>
                        Proin sed sollicitudin libero. Suspendisse placerat sem varius sapien viverra, cursus porta mi mattis. Integer consequat ex libero, quis sollicitudin tellus imperdiet vitae. Quisque ac magna sed dolor tristique posuere at vitae nunc. Pellentesque ut erat convallis, posuere diam in, tempus dui. Nam suscipit enim leo, id facilisis sapien pellentesque pharetra. Vivamus elementum molestie ex, eu pellentesque nisi ornare id.
                    </Typography>
                    
                    <div style={{marginTop:'2rem'}}>
                        <Button raised color="primary" style={{marginRight:'1rem'}} component={Link} to="/evolve">
                            <AddIcon style={{marginRight: '0.5rem'}} /> New Population
                        </Button>
                        <Button raised color="accent">
                        <OpenInBrowserIcon style={{marginRight: '0.5rem'}} /> Import Existing Data
                        </Button>
                    </div>
                </Grid>
                <Grid  item sm={4} xs={12} style={{textAlign:'center', paddingTop: '3.5rem'}}>
                    
                    <img src={sample1} style={{maxWidth: '100%', height: 'auto' }} alt="Sample" />
                    <figure>Sample output of ImageneWeb</figure>
                </Grid>

            </Grid>
        );
    }
}

export default withStyles(styles)(Home);
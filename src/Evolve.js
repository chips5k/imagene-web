import React, { Component } from 'react';

import Grid from 'material-ui/Grid';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from 'material-ui/List';

import Card, { CardActions } from 'material-ui/Card';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import ThumbDownIcon from 'material-ui-icons/ThumbDown';
import sample1 from "./img/samples/1.png";
import ForwardIcon from 'material-ui-icons/Forward';
import IconButton from 'material-ui/IconButton';
import SettingsIcon from 'material-ui-icons/Settings';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';
import LockIcon from 'material-ui-icons/Lock';
import RefreshIcon from 'material-ui-icons/Refresh';
import PopulationDialog from './PopulationDialog';
import GenerationDialog from './GenerationDialog';

const styles = theme => ({
    paper: {
        zIndex: 1000,
        borderLeft: '1px solid #ccc',
        paddingTop: '60px',
        minWidth: '320px'
    },
    paperB: {
        zIndex: 1000,
        borderTop: '1px solid #ccc',
        padding: 20
    },
    evolve: {
        padding: theme.spacing.unit * 3,
        paddingRight: 360,
        paddingBottom: 200
    }
});


  
class Evolve extends Component {

    constructor(props) {
        super(props);
        this.state = {
            populationDialogOpen: false,
            generationDialogOpen: false
        };
    }

    openPopulationDialog() {
        this.setState({
            populationDialogOpen: true
        });
    }

    closePopulationDialog() {
        this.setState({
            populationDialogOpen: false
        });
    }

    confirmPopulationDialog() {
        this.setState({
            populationDialogOpen: false,
            generationDialogOpen: true
        });
    }

    openGenerationDialog() {
        this.setState({
            generationDialogOpen: true
        });
    }

    closeGenerationDialog() {
        this.setState({
            generationDialogOpen: false
        });
    }

    
    confirmGenerationDialog() {
        this.setState({
            generationDialogOpen: false
        });
    }

    render() {
        return (
            <div className={this.props.classes.evolve}>

                <Typography type="display1" gutterBottom>
                    Please rate the following images
                </Typography>
                <Typography type="body1" gutterBottom style={{marginBottom: '1rem'}}>
                    By rating these images, you are providing input on the selection process used in the next generation.
                    When you are happy with your input, click proceed at the bottom of the page
                </Typography>

                <Typography type="body1" gutterBottom style={{marginBottom: '2rem'}}>
                    If you would like to adjust the RGB Thresholds, Image Sample sizes, or anything else, click the <SettingsIcon/> icon 
                    in the right hand drawer for the current generation.
                </Typography>
                
                <Grid container spacing={24}>
                    {[0, 1, 2].map(n => (
                        <Grid item key={n} sm={12} md={6} lg={4} xs={12}>
                            <Card>
                                <img src={sample1} style={{width: '100%', height:'auto'}} alt="" />
                                <CardActions>
                                    <div style={{flex: 1}}>
                                        <Button dense color="primary" style={{marginRight: '1rem' }}>
                                            <ThumbUpIcon style={{marginRight: '0.5rem'}} /> Like 
                                        </Button>
                                        <Button dense  color="accent" style={{marginRight: '1rem' }} >
                                            <ThumbDownIcon  style={{marginRight: '0.5rem'}} /> Dislike
                                        </Button>
                                    </div>
                                    <Typography>-5</Typography>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
               
               
                <Drawer type="permanent" anchor="bottom" elevation={16} classes={{
                    docked: this.props.classes.docked,
                    paper: this.props.classes.paperB
                }}>
                    <div>
                    <Button raised color="accent" style={{marginRight: '1rem'}}>
                            <RefreshIcon style={{marginRight: '0.5rem'}} /> Regenerate
                        </Button>
                        <Button raised color="primary" >
                            <ForwardIcon  style={{marginRight: '0.5rem'}} /> Proceed
                        </Button>
                    </div>
                </Drawer>   
                
                <Drawer type="permanent" anchor="right" classes={{
                    docked: this.props.classes.docked,
                    paper: this.props.classes.paper
                }}>

                    <List >
                        <ListSubheader style={{display:'flex', backgroundColor: '#f7f7f7', paddingRight: 0}}>
                            <div style={{flex: 1}}>Initial Population Settings</div>
                            <IconButton style={{marginRight: 0}} onClick={this.openPopulationDialog.bind(this)}><LockIcon /></IconButton>
                        </ListSubheader>
                        <Divider />
                        <ListItem>
                            <Typography>
                                <ul style={{listStyleType: 'square'}}>
                                    <li>Individuals: 24</li>
                                    <li>Min Depth: 1</li>
                                    <li>Max Depth: 12</li>
                                </ul>
                            </Typography>
                        </ListItem>
                        <Divider />
                        <ListSubheader style={{backgroundColor: '#f7f7f7'}}>Generations</ListSubheader>
                        <Divider />

                       
                        <ListItem button style={{borderBottom: '1px solid #eee'}}>
                            <ListItemIcon>
                                <KeyboardArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Generation 1" style={{paddingLeft: 0}}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.openGenerationDialog.bind(this)}>
                                    <LockIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        <ListItem button  style={{backgroundColor: 'lightblue'}}>
                            <ListItemIcon>
                                <KeyboardArrowDownIcon />
                            </ListItemIcon>
                            <ListItemText primary="Generation 2"  style={{paddingLeft: 0}}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.openGenerationDialog.bind(this)}>
                                    <LockIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem style={{backgroundColour: '#ccc'}}>
                            <Typography>
                                <ul style={{listStyleType: 'square'}}>
                                    <li>Num Samples: 6</li>
                                    <li>Width: 320, Height: 320</li>
                                    <li>Red Threshold: 124, 255</li>
                                    <li>Green threshold: 82, 97</li>
                                    <li>Blue threshold: 55, 100</li>
                                </ul>
                            </Typography>
                        </ListItem>
                            
                            
                        <Divider/>
                        <ListItem button  style={{borderBottom: '1px solid #eee'}}>
                            <ListItemIcon>
                                <KeyboardArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Generation 2"  style={{paddingLeft: 0}}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.openGenerationDialog.bind(this)}>
                                    <SettingsIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>

                        

                       
                    </List>
                </Drawer>

                <PopulationDialog 
                    open={this.state.populationDialogOpen} 
                    handleCloseAction={this.closePopulationDialog.bind(this)} 
                    handleSubmitAction={this.confirmPopulationDialog.bind(this)} />

                <GenerationDialog 
                    open={this.state.generationDialogOpen} 
                    handleCloseAction={this.closeGenerationDialog.bind(this)} 
                    handleSubmitAction={this.confirmGenerationDialog.bind(this)} />
            </div>
        );
    }
}

export default withStyles(styles)(Evolve);
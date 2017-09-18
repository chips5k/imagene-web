import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
export default class PopulationDialog extends Component {

    render() {
        return (
            <Dialog open={this.props.open} >
                <DialogTitle>Generation Configuration</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container>
                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Number of Samples"
                                    defaultValue="24"
                                    helperText="The number of images you wish to generate"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Sample Width"
                                    defaultValue="320"
                                    helperText="The width of generated images"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Sample Height"
                                    defaultValue="320"
                                    helperText="The height of generated images"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Red Threshold Min"
                                    defaultValue="0"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Red Threshold Max"
                                    defaultValue="255"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Green Threshold Min"
                                    defaultValue="0"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Green Threshold Max"
                                    defaultValue="255"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Blue Threshold Min"
                                    defaultValue="0"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Blue Threshold Max"
                                    defaultValue="255"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            
                            
                        </Grid>
                        
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button raised color="primary" onClick={this.props.handleSubmitAction}>Continue</Button>
                    <Button raised onClick={this.props.handleCloseAction}>Cancel</Button>
                </DialogActions>
          </Dialog>
        );
    }

}
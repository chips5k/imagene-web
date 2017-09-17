import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
import { FormControl, FormHelperText, FormGroup } from 'material-ui/Form';
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

                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Sample Width"
                                    defaultValue="320"
                                    helperText="The width of generated images"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            
                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Sample Height"
                                    defaultValue="320"
                                    helperText="The height of generated images"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                
                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Red Threshold"
                                    defaultValue="6"
                                    helperText="Min/Max red values for image generation"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            
                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Green Threshold"
                                    defaultValue="6"
                                    helperText="Min/Max Green values for image generation"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>

                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Blue Threshold"
                                    defaultValue="6"
                                    helperText="Min/Max Blue values for image generation"
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
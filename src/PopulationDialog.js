import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Grid from 'material-ui/Grid';
export default class PopulationDialog extends Component {

    render() {
        return (
            <Dialog open={this.props.open} >
                <DialogTitle>Population Configuration</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container>
                            <Grid item sm={12}>
                                <TextField
                                    id="helperText"
                                    label="Initial Population Size"
                                    defaultValue="24"
                                    helperText="The number of formulae you wish to generate"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>

                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Min Depth"
                                    defaultValue="6"
                                    helperText="Minimum depth of individual expressions"
                                    margin="normal"
                                    style={{width:'100%'}}
                                />
                            </Grid>
                            
                            <Grid item sm={6}>
                                <TextField
                                    id="helperText"
                                    label="Max Depth"
                                    defaultValue="12"
                                    helperText="Maximum depth of individual expressions"
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
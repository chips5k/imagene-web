import FormControl from '../../../common/controls/FormControl';
import ColourRangeInput from '../../../common/controls/ColourRangeInput';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../../common/Modal';
import React, { Component } from 'react';

export default class ExportSamplesModal extends Component {
    
    getFormData() {
        const types = [];

        if(this.refs.cartesian.checked) {
            types.push('cartesian');
        }

        if(this.refs.polar.checked) {
            types.push('polar');
        }
        return {
            width: this.refs.width.value,
            height: this.refs.height.value,
            coordinateTypes: types,
            redThreshold: this.refs.redThreshold.value,
            greenThreshold: this.refs.greenThreshold.value,
            blueThreshold: this.refs.blueThreshold.value
        }
    }

    render() {
        return (
           <Modal onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    Export <b>{this.props.selectedSamples.length}</b> Sample(s)
                </ModalHeader>
                <ModalBody>
                    {this.props.exportedSamples.length > 0 && 
                        <div>
                            <h3>Available Exports</h3>
                            <ul>
                                {this.props.exportedSamples.map((n, i) => 
                                    <li key={i}>
                                        {n.name}<br/>[&nbsp;
                                            {n.processing && 
                                                <span>
                                                    <span>processing...</span>&nbsp;
                                                    <i className="fa fa-spin fa-spinner"></i>
                                                </span>    
                                            }
                                            
                                            {!n.processing && 
                                                <span>
                                                    <a href={n.asymmetricDataUrl} download={`${n.name} asymmetric.png`} target="_BLANK">Asymmetric</a> | &nbsp;
                                                    <a href={n.symmetricDataUrl} download={`${n.name} symmetric.png`} target="_BLANK">Symmetric</a>
                                                </span>
                                            }
                                        &nbsp;]
                                    </li>
                                )}
                            </ul>
                        </div>
                    }
                           
                    <p>You have selected <b>{this.props.selectedSamples.length}</b> samples to export, please adjust the width/height and RGB thresholds for the export.<br/> <b>Please note</b>, the values adjusted here, will not alter the original samples.</p>

                    <div className="hbox" style={{marginBottom: '1rem'}}>
                        <div>
                            <span style={{marginTop: 0, marginBottom: '0.5rem', display: 'block', fontSize: '0.7rem'}}>Coordinate Types</span>
                            <label className="checkbox-inline">
                                <input type="checkbox" ref="cartesian" name="cartesian" value="y" defaultChecked={true} />
                                Cartesian
                            </label>
                            <label className="checkbox-inline">
                                <input type="checkbox" ref="polar" name="polar" value="y" defaultChecked={true} />
                                Polar
                            </label>
                        </div>
                        
                    </div>

                    <div className="hbox">
                        <FormControl label="Width">
                            <input className="form-control__input text-input" ref="width" type="text" name="width" defaultValue="320"/> 
                        </FormControl>

                        <FormControl label="Height">
                            <input className="form-control__input text-input" ref="height" type="text" name="height" defaultValue="320"/> 
                        </FormControl>
                    </div>

                    <div className="vbox">
                    
                        <FormControl label="Red Threshold" last>
                            <ColourRangeInput  ref="redThreshold"  colour="red" minValue={0} maxValue={255} width={300}/>  
                        </FormControl>

                        <FormControl label="Green Threshold" last>
                            <ColourRangeInput ref="greenThreshold"  colour="green"  minValue={0} maxValue={255} width={300} />  
                        </FormControl>

                        <FormControl label="Blue Threshold" last>
                            <ColourRangeInput ref="blueThreshold"  colour="blue"  minValue={0} maxValue={255}  width={300}/>  
                        </FormControl>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="button button--primary" onClick={this.props.onExportSamplesClick}>Export</button>
                    <button className="button" onClick={this.props.onCloseModalClick}>Cancel</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
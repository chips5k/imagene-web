import FormControl from '../controls/FormControl';
import ColourRangeInput from '../controls/ColourRangeInput';
import React, { Component } from 'react';

export default class ExportSamplesModal extends Component {
    
    handleCloseModalClick(e) {
        e.preventDefault();
        this.props.onCloseModalClick();
    }

    handleExportSamplesClick(e) {
        e.preventDefault();
        this.props.onExportSamplesClick();
    }

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
            <div className={'modal' + (this.props.open ? ' modal--open' : '')}>
                
                <div className="modal__panel">
                    <div className="modal__header">
                        <h2 className="modal__title">Export <b>{this.props.selectedSamples.length}</b> Sample(s)</h2>
                        <a href="" className="modal__close" onClick={this.handleCloseModalClick.bind(this)}><i className="fa fa-remove"></i></a>
                    </div>
                    <div className="modal__body">

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
                                                    <a href={n.symmetricDataUri} download={`${n.name} asymmetric.png`} target="_BLANK">Asymmetric</a> | &nbsp;
                                                    <a href={n.asymmetricDataUri} download={`${n.name} symmetric.png`} target="_BLANK">Symmetric</a>
                                                </span>
                                            }
                                        &nbsp;]
                                    </li>
                                )}
                            </ul>
                        </div>}
                        
                        
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

                    </div>
                    <div className="modal__footer">
                        <button className="button button--primary" onClick={this.handleExportSamplesClick.bind(this)}>Download/Export</button>
                        <button className="button" onClick={this.handleCloseModalClick.bind(this)}>Cancel</button>
                    </div>
                </div>
                <div className="modal__blocker"  onClick={this.handleCloseModalClick.bind(this)}></div>
            </div>
        );
    }
}

    
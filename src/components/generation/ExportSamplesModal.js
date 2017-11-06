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

    render() {
        return (
            <div className={'modal' + (this.props.open ? ' modal--open' : '')}>
                    
                <div className="modal__panel">
                    <div className="modal__header">
                        <h2 className="modal__title">Export <b>{this.props.selectedSamples.length}</b> Sample(s)</h2>
                        <a href="" className="modal__close" onClick={this.handleCloseModalClick.bind(this)}><i className="fa fa-remove"></i></a>
                    </div>
                    <div className="modal__body">

                        <p>You have selected <b>{this.props.selectedSamples.length}</b> samples to export, please adjust the width/height and RGB thresholds for the export.<b>Please note</b>, the values adjusted here, will not alter the original samples.</p>

                        <div className="hbox">
                            <FormControl label="Width">
                                <input className="form-control__input text-input" type="text" name="width" defaultValue="320"/> 
                            </FormControl>

                            <FormControl label="Height">
                                <input className="form-control__input text-input" type="text" name="height" defaultValue="320"/> 
                            </FormControl>
                        </div>

                        <div className="vbox" style={{width: 300}}>
                        
                            <FormControl label="Red Threshold" last>
                                <ColourRangeInput  ref="redThreshold"  colour="red" minValue={0} maxValue={255} />  
                            </FormControl>

                            <FormControl label="Green Threshold" last>
                                <ColourRangeInput ref="greenThreshold"  colour="green"  minValue={0} maxValue={255} />  
                            </FormControl>

                            <FormControl label="Blue Threshold" last>
                                <ColourRangeInput ref="blueThreshold"  colour="blue"  minValue={0} maxValue={255} />  
                            </FormControl>
                        </div>

                    </div>
                    <div className="modal__footer">
                        <button className="button button--primary" onClick={this.handleExportSamplesClick.bind(this)}>Download/Export</button>
                        <button className="button" onClick={this.handleCloseModalClick.bind(this)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    }
}

    
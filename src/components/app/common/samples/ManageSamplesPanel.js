import React, {Component} from 'react';

import { Panel, PanelBody, PanelHeader } from '../../../common/Panel';

import FormControl from '../../../common/controls/FormControl';
import StepperInput from '../../../common/controls/StepperInput';
import ColourRangeInput from '../../../common/controls/ColourRangeInput';

export default class ManageSamplesPanel extends Component {
    
    getFormData() {
        return {
            numSamples: this.refs.numSamples.value,
            redThreshold: this.refs.redThreshold.value,
            greenThreshold: this.refs.greenThreshold.value,
            blueThreshold: this.refs.blueThreshold.value
        }
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <i className="fa fa-image"></i> {this.props.selectedSamples.length > 0 ? 'Update/Export' : 'Generate'} Samples
                </PanelHeader>
                <PanelBody>
                    {this.props.selectedSamples.length > 0 &&
                    <p>{this.props.selectedSamples.length} sample(s) selected, you can adjust the options below and regenerate or export these items.</p>}
                    <div style={{display: this.props.selectedSamples.length > 0  ? 'none' : 'block'}}>
                    <FormControl label="No. Samples">
                        <StepperInput ref="numSamples" value={4} maxValue={6} />  
                    </FormControl>
                    </div>

                    <div className="vbox">
                        <FormControl label="Red Threshold" last>
                            <ColourRangeInput  ref="redThreshold"  colour="red" minValue={0} maxValue={255} width={300} />  
                        </FormControl>

                        <FormControl label="Green Threshold" last>
                            <ColourRangeInput ref="greenThreshold"  colour="green"  minValue={0} maxValue={255}  width={300}/>  
                        </FormControl>

                        <FormControl label="Blue Threshold" last>
                            <ColourRangeInput ref="blueThreshold"  colour="blue"  minValue={0} maxValue={255} width={300} />  
                        </FormControl>
                    </div>
                    {this.props.selectedSamples.length === 0 && 
                    <button className="button button--primary" onClick={this.props.onGenerateSamplesClick}>
                        <i className="fa fa-plus"></i> Generate
                    </button>}
                    {this.props.selectedSamples.length === 0 && this.props.samples.length > 0 && 
                    <button className="button button--danger" onClick={this.props.onRemoveSamplesClick}>
                        <i className="fa fa-remove"></i> Remove All Samples
                    </button>}

                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--primary" onClick={this.props.onUpdateSamplesClick}>
                        <i className="fa fa-refresh"></i> Update
                    </button>}
                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--primary" onClick={this.props.onExportSamplesClick}>
                        <i className="fa fa-save"></i> Export
                    </button>}
                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--danger" onClick={this.props.onRemoveSamplesClick}>
                        <i className="fa fa-remove"></i> Remove 
                    </button>}
                </PanelBody>
            </Panel>
        );
    }
}
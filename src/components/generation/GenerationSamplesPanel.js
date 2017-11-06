import React, {Component} from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader
} from '../content';

import FormControl from '../controls/FormControl';
import StepperInput from '../controls/StepperInput';
import ColourRangeInput from '../controls/ColourRangeInput';

export default class GenerationSamplesPanel extends Component {
    
    onClickGenerateSamples(e) {
        this.props.onClickGenerateSamples(
            this.refs.numSamples.value,
            320, 320,
            this.refs.redThreshold.value,
            this.refs.greenThreshold.value,
            this.refs.blueThreshold.value
        );
        if(window.innerWidth < 1224) {
            this.props.toggleContentSidebar(e);
        }
    }

    onClickUpdateSelectedSamples(e) {
        e.preventDefault();
        this.props.onClickUpdateSelectedSamples(
            this.props.selectedSamples,
            320, 320,
            this.refs.redThreshold.value,
            this.refs.greenThreshold.value,
            this.refs.blueThreshold.value)
    }

    handleClickExportSamples(e) {
        e.preventDefault();
        this.props.onClickExportSamples();
    }

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
            <ContentSidebarPanel>
                <ContentSidebarPanelHeader>
                    <i className="fa fa-image"></i> {this.props.selectedSamples.length > 0 ? 'Update/Export' : 'Generate'} Samples
                </ContentSidebarPanelHeader>
                <ContentSidebarPanelBody>
                    {this.props.selectedSamples.length > 0 &&
                    <p>{this.props.selectedSamples.length} sample(s) selected, you can adjust the options below and regenerate or export these items.</p>}
                    <div style={{display: this.props.selectedSamples.length > 0  ? 'none' : 'block'}}>
                    <FormControl label="No. Samples">
                        <StepperInput ref="numSamples" value={4} maxValue={6} />  
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
                    {this.props.selectedSamples.length === 0 && 
                    <button className="button button--primary" onClick={this.onClickGenerateSamples.bind(this)}>
                        <i className="fa fa-plus"></i> Generate
                    </button>}
                    {this.props.selectedSamples.length === 0 && this.props.samples.length > 0 && 
                    <button className="button button--danger" onClick={this.props.onClickRemoveSamples}>
                        <i className="fa fa-remove"></i> Remove All Samples
                    </button>}

                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--primary" onClick={this.onClickUpdateSelectedSamples.bind(this)}>
                        <i className="fa fa-refresh"></i> Update
                    </button>}
                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--primary" onClick={this.handleClickExportSamples.bind(this)}>
                        <i className="fa fa-save"></i> Export
                    </button>}
                    {this.props.selectedSamples.length > 0 &&  
                    <button className="button button--danger"  onClick={this.props.onClickRemoveSamples}>
                        <i className="fa fa-remove"></i> Remove 
                    </button>}
                </ContentSidebarPanelBody>
            </ContentSidebarPanel>
        );
    }
}
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
                    <i className="fa fa-image"></i> Generate Samples
                </ContentSidebarPanelHeader>
                <ContentSidebarPanelBody>
                    <FormControl label="No. Samples">
                        <StepperInput ref="numSamples" value={4} maxValue={6} />  
                    </FormControl>

                    {/* <div className="hbox">
                        <FormControl label="Width">
                            <input className="text-input" type="text" ref="width" defaultValue={320} />
                        </FormControl>

                        <FormControl label="Height" last>
                            <input  className="text-input" type="text" ref="height" defaultValue={320} />
                        </FormControl>
                    </div> */}

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
                    <button className="button button--primary" onClick={this.onClickGenerateSamples.bind(this)}>
                        <i className="fa fa-plus"></i> Generate
                    </button> 
                    <button className="button button--primary" onClick={this.onClickGenerateSamples.bind(this)}>
                        <i className="fa fa-refresh"></i> Update
                    </button>
                    <button className="button button--primary" onClick={this.onClickGenerateSamples.bind(this)}>
                        <i className="fa fa-save"></i> Export
                    </button>
                </ContentSidebarPanelBody>
            </ContentSidebarPanel>
        );
    }
}
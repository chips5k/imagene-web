import React, {Component} from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader, 
    ContentSidebarPanelFooter
} from '../content';

import FormControl from '../controls/FormControl';
import StepperInput from '../controls/StepperInput';
import ColourRangeInput from '../controls/ColourRangeInput';

export default class GenerationSamplesPanel extends Component {
    
    onClickGenerateSamples() {
        this.props.onClickGenerateSamples(
            this.refs.numSamples.value,
            this.refs.width.value,
            this.refs.height.value,
            this.refs.redThreshold.value,
            this.refs.greenThreshold.value,
            this.refs.blueThreshold.value
        );
    }

    render() {
        return (
            <ContentSidebarPanel>
                <ContentSidebarPanelHeader>
                    Generate Samples
                </ContentSidebarPanelHeader>
                <ContentSidebarPanelBody>
                    <div className="hbox">
                        <FormControl label="No. Samples">
                            <StepperInput ref="numSamples" value={3} />  
                        </FormControl>

                        <FormControl label="Width">
                            <input className="text-input" type="text" ref="width" defaultValue={320}/>
                        </FormControl>

                        <FormControl label="Height" last>
                            <input  className="text-input" type="text" ref="height" defaultValue={320} />
                        </FormControl>
                    </div>

                    <div className="vbox">
                        
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
                </ContentSidebarPanelBody>
                <ContentSidebarPanelFooter>
                    <button className="main-sidebar-panel__action-button" onClick={this.onClickGenerateSamples.bind(this)}>
                        <i className="fa fa-refresh"></i> Generate
                    </button> 
                </ContentSidebarPanelFooter>
            </ContentSidebarPanel>
        );
    }
}
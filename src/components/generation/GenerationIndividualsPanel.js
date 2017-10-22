import React, {Component} from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader
} from '../content';

import FormControl from '../controls/FormControl';
import StepperInput from '../controls/StepperInput';

export default class GenerationIndividualsPanel extends Component {

    onClickGenerateIndividuals() {
        this.props.onClickGenerateIndividuals(
            this.refs.size.value,
            this.refs.minDepth.value,
            this.refs.maxDepth.value
        );
    }

    getFormData() {
        return {
            size: this.refs.size.value,
            minDepth: this.refs.minDepth.value,
            maxDepth: this.refs.maxDepth.value  
        };
    }

    render() {
        return (
            <ContentSidebarPanel>
                <ContentSidebarPanelHeader>
                    <i className="fa fa-sitemap"></i> Population
                </ContentSidebarPanelHeader>
                <ContentSidebarPanelBody>
                    <div className="hbox">
                        <FormControl label="Population Size">
                            <StepperInput ref="size" value={this.props.config.numberOfIndividuals} minValue={0} maxValue={24}/>  
                        </FormControl>
            
                        <FormControl label="Min Depth">
                            <StepperInput ref="minDepth" value={this.props.config.minExpressionDepth} minValue={0}  maxValue={24} />
                        </FormControl>
            
                        <FormControl label="Max Depth" last>
                            <StepperInput  ref="maxDepth" value={this.props.config.maxExpressionDepth} minValue={0}  maxValue={24} />
                        </FormControl>
                        
                    </div>
                    <button className="main-sidebar-panel__action-button" onClick={this.onClickGenerateIndividuals.bind(this)}>
                        <i className="fa fa-refresh"></i> {this.props.generation.individuals.length > 0 ? 'Regenerate' : 'Generate'}
                    </button>
                </ContentSidebarPanelBody>
            </ContentSidebarPanel>
        );
    }
}
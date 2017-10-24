import React, {Component} from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader
} from '../content';

import FormControl from '../controls/FormControl';
import StepperInput from '../controls/StepperInput';

export default class GenerationIndividualsPanel extends Component {

    onClickGenerateIndividuals(e) {
        this.props.onClickGenerateIndividuals(
            this.refs.size.value,
            this.refs.minDepth.value,
            this.refs.maxDepth.value
        );
        if(window.innerWidth < 1224) {
            this.props.toggleContentSidebar(e);
        }
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
                
                    <FormControl label="Population Size">
                        <StepperInput ref="size" value={this.props.config.numberOfIndividuals} minValue={0} maxValue={24}/>  
                    </FormControl>
                    
                    <div className="hbox">
                        <FormControl label="Min Depth">
                            <StepperInput ref="minDepth" value={this.props.config.minExpressionDepth} minValue={0}  maxValue={12} />
                        </FormControl>
            
                        <FormControl label="Max Depth" last>
                            <StepperInput  ref="maxDepth" value={this.props.config.maxExpressionDepth} minValue={0}  maxValue={12} />
                        </FormControl>
                    </div>
                    <button className="button button--primary" onClick={this.onClickGenerateIndividuals.bind(this)}>
                        <i className="fa fa-refresh"></i> {this.props.generation.individuals.length > 0 ? 'Regenerate' : 'Generate'}
                    </button>
                </ContentSidebarPanelBody>
            </ContentSidebarPanel>
        );
    }
}
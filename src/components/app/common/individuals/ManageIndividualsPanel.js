import React, {Component} from 'react';

import { Panel, PanelBody, PanelHeader } from '../../../common/Panel';
import FormControl from '../../../common/controls/FormControl';
import StepperInput from '../../../common/controls/StepperInput';

export default class ManageIndividualsPanel extends Component {

    getFormData() {
        return {
            size: this.refs.size.value,
            minDepth: this.refs.minDepth.value,
            maxDepth: this.refs.maxDepth.value  
        };
    }

    render() {
        return (
            <Panel>
                <PanelHeader>
                    <i className="fa fa-sitemap"></i> Population
                </PanelHeader>
                <PanelBody>
                
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
                    <button className="button button--primary" onClick={this.props.onGenerateIndividualsClick}>
                        <i className="fa fa-refresh"></i> {this.props.generation.individuals.length > 0 ? 'Regenerate' : 'Generate'}
                    </button>
                </PanelBody>
            </Panel>
        );
    }
}
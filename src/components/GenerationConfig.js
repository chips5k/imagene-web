import React, { Component } from 'react';
import FormControl from './FormControl';
import StepperInput from './StepperInput';
import ColourRangeInput from './ColourRangeInput';
export default class GenerationConfig extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false
        };
    }

    handleToggleCollapse() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleSaveChanges() {

    }
    

    render() {

        let rootClasses = 'generation-config ' + (this.state.collapsed ? 'generation-config--collapsed' : '');
        return (
            <div className={rootClasses}>
                <div className="generation-config__header" onClick={this.handleToggleCollapse.bind(this)}>
                    <h3 className="generation-config__title">Generation 1</h3>
                    <span className="generation-config__collapse-toggle"> 
                        <i className={this.state.collapsed ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                    </span>
                </div>
                <div className="generation-config__body">
                    <div className="generation-config__content">
                        <div style={{display: 'flex'}}>
                            <FormControl label="No. Samples">
                                <StepperInput value={24} />  
                            </FormControl>

                            <FormControl label="Width">
                                <input className="text-input" type="text" defaultValue="320" />
                            </FormControl>

                            <FormControl label="Height" last>
                                <input  className="text-input" type="text" defaultValue="320" />
                            </FormControl>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column'}}>

                            <FormControl label="Red Threshold" last>
                                <ColourRangeInput value={[0, 255]}  colour="red" />  
                            </FormControl>

                            <FormControl label="Green Threshold" last>
                                <ColourRangeInput value={[0, 255]}  colour="green" />  
                            </FormControl>

                            <FormControl label="Blue Threshold" last >
                                <ColourRangeInput value={[0, 255]} colour="blue" />  
                            </FormControl>
                        </div>
                        

                        <div className="generation-config__actions">
                            <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.handleSaveChanges.bind(this)}>
                                <i className="fa fa-check"></i> Save changes
                            </button> 
                            <button className="button button--cancel" onClick={this.handleSaveChanges.bind(this)}>
                                <i className="fa fa-remove"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

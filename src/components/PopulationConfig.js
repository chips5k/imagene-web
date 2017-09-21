import React, { Component } from 'react';
import FormControl from './FormControl';
import StepperInput from './StepperInput';
export default class PopulationConfig extends Component {

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

    onClickSave() {
        this.props.onSave({
            size: this.refs.size.value,
            minDepth: this.refs.minDepth.value,
            maxDepth: this.refs.maxDepth.value
        });
    }
    

    render() {
        let rootClasses = 'population-config ' + (this.state.collapsed ? 'population-config--collapsed' : '');
        return (
            <div className={rootClasses}>
                <div className="population-config__header" onClick={this.handleToggleCollapse.bind(this)}>
                    <h3 className="population-config__title"><i className="fa fa-gl-e"/> Population</h3>
                    <span className="population-config__collapse-toggle"> 
                        <i className={this.state.collapsed ? 'fa fa-angle-up' : 'fa fa-angle-down'}></i>
                    </span>
                </div>
                <div className="population-config__body">
                    <div className="population-config__content">
                        <div style={{display: 'flex'}}>
                            <FormControl label="Population Size">
                                <StepperInput ref="size" value={this.props.size} />  
                            </FormControl>

                            <FormControl label="Min Depth">
                                <StepperInput ref="minDepth" value={this.props.minDepth} />
                            </FormControl>

                            <FormControl label="Max Depth" last>
                                <StepperInput  ref="maxDepth" value={this.props.maxDepth} />
                            </FormControl>
                        </div>
                        <div className="population-config__actions">
                            <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.onClickSave.bind(this)}>
                                <i className="fa fa-check"></i> Save changes
                            </button> 
                            <button className="button button--cancel">
                                <i className="fa fa-remove"></i> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

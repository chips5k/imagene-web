import React, { Component } from 'react';
import Sample1 from './img/samples/1.png';
import Sample2 from './img/samples/2.png';
import Sample3 from './img/samples/3.png';
import Sample4 from './img/samples/4.png';
import Sample5 from './img/samples/6.png';
import Sample6 from './img/samples/7.png';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';

import { updatePopulationConfig } from './actions';
import { connect } from 'react-redux';
// import {Link} from 'react-router-dom';

class Generation extends Component {

    onClickSave() {
        this.props.onSave({
            size: this.refs.size.value,
            minDepth: this.refs.minDepth.value,
            maxDepth: this.refs.maxDepth.value
        });
    }

    render() {

        let content = null;

        if(this.props.population.length === 0) {
            content = (
                <p>Please configure the initial population to proceed...</p>
            );
        } else {
            content = (
                <p>Output Population Graph here ?</p>

            )

        }

        return (
            <div className="main">
                <div className="main__header">
                    <div className="main__title">Population</div>
                </div>
                <div className="main__body"> 
                    <div className="main__content">
                        {content}
                    </div>
                    <div className="main__sidebar">
                        
                        <div className="main-sidebar-panel">
                            <div className="main-sidebar-panel__header">
                                <div className="main-sidebar-panel__title">

                                </div>
                            </div>
                            <div className="main-sidebar-panel__body">
                                <div className="hbox">
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

                                <div className="hbox">

                                    <FormControl label="Red Threshold" last>
                                        <ColourRangeInput minValue={0} maxValue={255}  colour="red" />  
                                    </FormControl>

                                    <FormControl label="Green Threshold" last>
                                        <ColourRangeInput minValue={0} maxValue={255}  colour="green" />  
                                    </FormControl>

                                    <FormControl label="Blue Threshold" last >
                                        <ColourRangeInput minValue={0} maxValue={255} colour="blue" />  
                                    </FormControl>

                                   
                                </div>
                            </div>
                            <div className="main-sidebar-panel__actions">
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
                
            </div>
        );
        
    }
}

const mapStateToProps = state => state;

const mapDispatchToProps = {
    updatePopulationConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(Population);

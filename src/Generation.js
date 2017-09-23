import React, { Component } from 'react';
import Sample1 from './img/samples/1.png';
import Sample2 from './img/samples/2.png';
import Sample3 from './img/samples/3.png';
import Sample4 from './img/samples/4.png';
import Sample5 from './img/samples/6.png';
import Sample6 from './img/samples/7.png';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import ColourRangeInput from './components/ColourRangeInput';
import { push } from 'react-router-redux';
import { updateGeneration } from './actions';
import { connect } from 'react-redux';
// import {Link} from 'react-router-dom';

class Generation extends Component {

    componentWillMount() {
        if(this.props.population.individuals.length === 0) {
            this.props.redirect('/population'); 
        }
    }

    onClickSave() {
        this.props.updateGeneration({
            id: null,
            population: this.props.population,
            config: {
                numSamples: this.refs.numSamples.value,
                sampleWidth: this.refs.sampleWidth.value,
                sampleHeight: this.refs.sampleHeight.value,
                redThresholdMin: this.refs.redThreshold.min,
                redThresholdMax: this.refs.redThreshold.max,
                greenThresholdMin: this.refs.greenThreshold.min,
                greenThresholdMax: this.refs.greenThreshold.max,
                blueThresholdMin: this.refs.blueThreshold.min,
                blueThresholdMax: this.refs.blueThreshold.max,
            }
        });
    }


    render() {
        
        
        let content = null;
        
        if(!this.props.generation) {
            content = (
                <div>
                    <h2>Generations</h2>
                    <p>Please configure the settings for the initial generation via the sidebar.</p>
                </div>
            );
        } else {
            content = (
                <div>
                    <p>Output Generation Tabs here</p>
                    <ul>
                        {this.props.generation.samples.map(n => 
                            <li key={n.id}>SAaaaaample</li>
                        )}
                    </ul>
                </div>
            );
        }

        console.log(this.props.generation);
        return (
            <div className="main">
                <div className="main__header">
                    <div className="main__title">Generations {this.props.generation && <span><i className="fa fa-angle-double-right" style={{marginLeft:'1rem', marginRight: '1rem'}}></i> Generation {this.props.generation.id}</span>}</div>
                </div>
                <div className="main__body"> 
                    <div className="main__content">
                        {content}
                    </div>
                    <div className="main__sidebar">
                        
                        <div className="main-sidebar-panel">
                            <div className="main-sidebar-panel__header">
                                <div className="main-sidebar-panel__title">
                                    Generation Configuration
                                </div>
                            </div>
                            <div className="main-sidebar-panel__body">
                                <div className="hbox">
                                    <FormControl label="No. Samples">
                                        <StepperInput value={this.props.generation ? this.props.generation.config.numSamples : 6} ref="numSamples" />  
                                    </FormControl>

                                    <FormControl label="Width">
                                        <input className="text-input" type="text" ref="sampleWidth" defaultValue={this.props.generation ? this.props.generation.config.sampleWidth : 320} />
                                    </FormControl>

                                    <FormControl label="Height" last>
                                        <input  className="text-input" type="text" ref="sampleHeight" defaultValue={this.props.generation ? this.props.generation.config.sampleHeight : 320} />
                                    </FormControl>
                                </div>

                                <div className="hbox">

                                    <FormControl label="Red Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.redThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.redThresholdMax : 0} ref="redThreshold"  colour="red" />  
                                    </FormControl>

                                    <FormControl label="Green Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.greenThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.greenThresholdMax : 0} ref="greenThreshold"  colour="green" />  
                                    </FormControl>

                                    <FormControl label="Blue Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.blueThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.blueThresholdMax : 0} ref="blueThreshold"  colour="blue" />  
                                    </FormControl>

                                   
                                </div>
                            </div>
                            <div className="main-sidebar-panel__actions">
                                <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.onClickSave.bind(this)}>
                                    <i className="fa fa-check"></i> Generate Samples
                                </button> 
                                <button className="button button--cancel">
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



const mapStateToProps = (state, ownProps) => {
    let id = parseInt(ownProps.match.params.id, 10);

    if(isNaN(id)) {
        id = 1;
    }
    
    return {
        ...state,
        generation: state.generations.find(n => n.id === id)
    }
};

const mapDispatchToProps = {
    updateGeneration,
    redirect: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

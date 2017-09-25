import React, { Component } from 'react';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import ColourRangeInput from './components/ColourRangeInput';
import { push } from 'react-router-redux';
import { updateGeneration } from './actions';
import { connect } from 'react-redux';
import GenerationSample from './GenerationSample';
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
            samples: [],
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
                useDecimalJs: this.refs.useDecimalJs.checked
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
                    <h2>Samples</h2>
                    <div className="tabs">
                        <div className="tabs__nav">
                            <a className="tabs__link tabs__link--active">Asymmetric</a>
                            <a className="tabs__link">Symmetric</a>
                            <a className="tabs__link">Polar Coordinates</a>
                            <a className="tabs__link tabs__link--last">Individuals</a>
                        </div>

                        <div className="tabs__body">
                            <div className="tabs__tab tabs__tab--active">
                            <div className="tabs__tab-content">
                                <div className="flex-grid">
                                    {this.props.generation.samples.map(s => 
                                        <GenerationSample
                                            key={s.id} 
                                            red={this.props.generation.population.individuals.find(n => n.id === s.red)}
                                            green={this.props.generation.population.individuals.find(n => n.id === s.green)}
                                            blue={this.props.generation.population.individuals.find(n => n.id === s.blue)}
                                            config={this.props.generation.config}
                                            sample={s}
                                        />
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            );
        }

        
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

                                <div className="vbox">
                                    
                                    <FormControl label="Red Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.redThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.redThresholdMax : 255} ref="redThreshold"  colour="red" />  
                                    </FormControl>

                                    <FormControl label="Green Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.greenThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.greenThresholdMax : 255} ref="greenThreshold"  colour="green" />  
                                    </FormControl>

                                    <FormControl label="Blue Threshold" last>
                                        <ColourRangeInput minValue={this.props.generation ? this.props.generation.config.blueThresholdMin : 0} maxValue={this.props.generation ? this.props.generation.config.blueThresholdMax : 255} ref="blueThreshold"  colour="blue" />  
                                    </FormControl>

                                   
                                </div>

                                
                                <FormControl label="Math Library">
                                        <div className="vbox">
                                            <label className="checkbox-item">
                                                <input className="checkbox-item__input" name="mathLibrary" type="checkbox" ref="useDecimalJs" value="true" defaultChecked={this.props.generation ? this.props.generation.config.useDecimalJs : false} /> <span className="checkbox-item__label">Use Decimal.js</span>
                                            </label>
                                        
                                            <div className="help-text">
                                                Using <b>Decimal.js</b> will considerably slow performance and processing. It should only be used if you wish to obtain extremely accurate results without the possibility of range overflows.
                                            </div>
                                        </div>
                                </FormControl>
                                
                                
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

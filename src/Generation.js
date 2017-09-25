import React, { Component } from 'react';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import ColourRangeInput from './components/ColourRangeInput';
import { push } from 'react-router-redux';
import { updateGeneration, newGeneration } from './actions';
import { connect } from 'react-redux';
import GenerationSample from './GenerationSample';
import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom';

class Generation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            generation: null
        };
    }

    componentDidMount() {
        if(!this.props.population.individuals.length) {
            this.props.redirect('/population');
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            generation: nextProps.generation
        });
    }
    
    onClickNewGeneration() {
        this.props.newGeneration(this.props.population);
    }   

    onClickSave() {
        this.props.updateGeneration({
            ...this.state.generation,
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
        if(!this.state.generation === false) {
            content = (
                <p>The generation requested could not be found</p>
            );
        }
        
        if(!this.state.generation) {
            if(this.props.generations.length) {
                content = (
                    <div>
                        <h2>Generations</h2>
                        {content}
                        <p>Please select a generation from below, or create a new one by clicking the "new generation" button</p> 
                        <ul>
                            {this.props.generations.map(n => 
                                <li  key={n.id}><Link to={`/generations/${n.id}`}>Generation {n.id}</Link></li>
                            )}
                        </ul>
                    </div>
                );   
            } else {
                content = (
                    <div>
                        <h2>Generations</h2>
                        {content}
                        <p>No Generations have been created yet, please click the button below to generate one now</p> 
                        <ul>
                            {this.props.generations.map(n => 
                                <li  key={n.id}><Link to={`/generations/${n.id}`}>Generation {n.id}</Link></li>
                            )}
                        </ul>

                        <button className="button button--primary" onClick={this.onClickNewGeneration.bind(this)}>Configure initial Generation</button>
                    </div>
                );
            }
        }
        
        if(this.state.generation && !this.state.generation.samples.length) {
            content = (
                <div>
                    <h2>Generations</h2>
                    <p>Please configure the settings for the initial generation samples via the sidebar.</p>
                </div>
            );
        }
        
        if(this.state.generation && this.state.generation.samples.length) {
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
                    {this.state.generation && 
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
                                            <StepperInput value={this.props.generation.config.numSamples} ref="numSamples" />  
                                        </FormControl>

                                        <FormControl label="Width">
                                            <input className="text-input" type="text" ref="sampleWidth" defaultValue={this.props.generation.config.sampleWidth} />
                                        </FormControl>

                                        <FormControl label="Height" last>
                                            <input  className="text-input" type="text" ref="sampleHeight" defaultValue={this.props.generation.config.sampleHeight} />
                                        </FormControl>
                                    </div>

                                    <div className="vbox">
                                        
                                        <FormControl label="Red Threshold" last>
                                            <ColourRangeInput minValue={this.props.generation.config.redThresholdMin} maxValue={this.props.generation.config.redThresholdMax} ref="redThreshold"  colour="red" />  
                                        </FormControl>

                                        <FormControl label="Green Threshold" last>
                                            <ColourRangeInput minValue={this.props.generation.config.greenThresholdMin} maxValue={this.props.generation.config.greenThresholdMax} ref="greenThreshold"  colour="green" />  
                                        </FormControl>

                                        <FormControl label="Blue Threshold" last>
                                            <ColourRangeInput minValue={this.props.generation.config.blueThresholdMin} maxValue={this.props.generation.config.blueThresholdMax} ref="blueThreshold"  colour="blue" />  
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
                    }
                </div>
                
            </div>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        generation: ownProps.match.params.id ? state.generations.find(n => parseInt(n.id) === parseInt(ownProps.match.params.id)) : null
    };
};

const mapDispatchToProps = {
    updateGeneration,
    redirect: push,
    newGeneration
};

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

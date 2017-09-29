import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import ColourRangeInput from './components/ColourRangeInput';
import { generateIndividuals, createGeneration, generateSamples } from './actions';
import GenerationSample from './GenerationSample';

class Generation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'individuals'
        };
    }

    onClickGenerateIndividuals() {
        this.props.generateIndividuals(this.props.generation, this.refs.size.value, this.refs.minDepth.value, this.refs.maxDepth.value);
    }

    onClickGenerateSamples() {
        this.props.generateSamples(
            this.props.generation,
            {
                numSamples: this.refs.numSamples.value,
                sampleWidth: this.refs.sampleWidth.value,
                sampleHeight: this.refs.sampleHeight.value,
                redThresholdMin: this.refs.redThreshold.min,
                redThresholdMax: this.refs.redThreshold.max,
                greenThresholdMin: this.refs.greenThreshold.min,
                greenThresholdMax: this.refs.greenThreshold.max,
                blueThresholdMin: this.refs.blueThreshold.min,
                blueThresholdMax: this.refs.blueThreshold.max
            }
        );
    }

    renderNotFound() {
        return (
            <div className="main">
            <div className="main__header">
                <div className="main__title">Generations</div>
            </div>
            <div className="main__body"> 
                <div className="main__content">
                    <h2>Error</h2>
                    <p>The specified generation could not be found...</p>
                </div>
            </div>
            </div>
        );
    }

    handleTabChange(tab) {
        this.setState({
            activeTab: tab
        });
    }

    renderGeneration() {

        let activeClass = (className, n) => {
            return className + (this.state.activeTab === n ? ' ' + className + '--active' : '');
        }
        
        return (
            <div className="main">
                <div className="main__header">
                    <div className="main__title">Generations {this.props.generation && <span><i className="fa fa-angle-double-right" style={{marginLeft:'1rem', marginRight: '1rem'}}></i> Generation {this.props.generation.id}</span>}</div>
                </div>
                <div className="main__body"> 
                    <div className="main__content">
                        <div>
                            <h2>Samples</h2>
                            <div className="tabs">
                                <div className="tabs__nav">
                                    <a className={activeClass('tabs__link', 'asymmetric')} onClick={this.handleTabChange.bind(this, "asymmetric")}>Asymmetric</a>
                                    <a  className={activeClass('tabs__link', 'symmetric')}  onClick={this.handleTabChange.bind(this, "symmetric")}>Symmetric</a>
                                    <a  className={activeClass('tabs__link', 'polar')}  onClick={this.handleTabChange.bind(this, "polar")}>Polar Coordinates</a>
                                    <a  className={activeClass('tabs__link', 'individuals')}  onClick={this.handleTabChange.bind(this, "individuals")}>Individuals</a>
                                </div>

                                <div className="tabs__body">
                                    <div className={activeClass('tabs__tab', 'asymmetric')}>
                                        <div className="tabs__tab-content">
                                            <div className="flex-grid">
                                                {this.props.generation.samples.map(s => 
                                                    <GenerationSample 
                                                        key={s.id} 
                                                        sample={s} 
                                                        redIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                        greenIndividual={this.props.generation.individuals.find(n => s.greenIndividualId === n.id)}
                                                        blueIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                        type="symmetric"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={activeClass('tabs__tab', 'symmetric')}>
                                        <div className="tabs__tab-content">
                                            <div className="flex-grid">
                                                {this.props.generation.samples.map(s => 
                                                    <GenerationSample 
                                                        key={s.id} 
                                                        sample={s} 
                                                        redIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                        greenIndividual={this.props.generation.individuals.find(n => s.greenIndividualId === n.id)}
                                                        blueIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                        type="asymmetric"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={activeClass('tabs__tab', 'polar')}>
                                        <div className="tabs__tab-content">
                                            <div className="flex-grid">
                                            {this.props.generation.samples.map(s => 
                                                <GenerationSample 
                                                    key={s.id} 
                                                    sample={s} 
                                                    redIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                    greenIndividual={this.props.generation.individuals.find(n => s.greenIndividualId === n.id)}
                                                    blueIndividual={this.props.generation.individuals.find(n => s.redIndividualId === n.id)}
                                                    type="polar"
                                                />
                                            )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={activeClass('tabs__tab', 'individuals')}>
                                        <div className="tabs__tab-content">
                                            <ul>
                                                {this.props.generation.individuals.map((n, i) => 
                                                    <li key={i}>{n.expression.join(" ")}</li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="main__sidebar">
                        {this.props.generation.id === 1 && this.props.generations.length === 1 &&   
                            <div className="main-sidebar-panel">
                                <div className="main-sidebar-panel__header">
                                    <div className="main-sidebar-panel__title">
                                        Generation Configuration
                                    </div>
                                </div>
                                <div className="main-sidebar-panel__body">
                                    <div className="hbox">
                                        <FormControl label="Population Size">
                                            <StepperInput ref="size" value={this.props.generation.size} minValue={0} maxValue={24}/>  
                                        </FormControl>

                                        <FormControl label="Min Depth">
                                            <StepperInput ref="minDepth" value={this.props.generation.minDepth} minValue={0}  maxValue={24} />
                                        </FormControl>

                                        <FormControl label="Max Depth" last>
                                            <StepperInput  ref="maxDepth" value={this.props.generation.maxDepth} minValue={0}  maxValue={24} />
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="main-sidebar-panel__actions">
                                    <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.onClickGenerateIndividuals.bind(this)}>
                                        <i className="fa fa-check"></i> (re)generate
                                    </button>
                                </div>
                            </div>
                        }

                        {this.props.generation.individuals.length > 0 && 
                        <div className="main-sidebar-panel">
                            <div className="main-sidebar-panel__header">
                                <div className="main-sidebar-panel__title">
                                    Generate Samples
                                </div>
                            </div>
                            <div className="main-sidebar-panel__body">
                                
                                <div className="hbox">
                                    <FormControl label="No. Samples">
                                        <StepperInput ref="numSamples" value={3} />  
                                    </FormControl>

                                    <FormControl label="Width">
                                        <input className="text-input" type="text" ref="sampleWidth" defaultValue={320}/>
                                    </FormControl>

                                    <FormControl label="Height" last>
                                        <input  className="text-input" type="text" ref="sampleHeight" defaultValue={320} />
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
                            </div>
                            <div className="main-sidebar-panel__actions">
                                <button style={{marginRight: '1rem'}} className="button button--save" onClick={this.onClickGenerateSamples.bind(this)}>
                                    <i className="fa fa-check"></i> Generate
                                </button> 
                            </div>
                        </div>}
                    </div>

                </div>
                
            </div>
        );
    }

    render() {
        console.log(this.props);
        if(this.props.generation) {
            return this.renderGeneration();
        }

        return this.renderNotFound();
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        generation: state.generations.find(n => n.id === parseInt(ownProps.match.params.id, 10))
    };
};

const mapDispatchToProps = {
    generateSamples,
    generateIndividuals,
    createGeneration
};

export default connect(mapStateToProps, mapDispatchToProps)(Generation);

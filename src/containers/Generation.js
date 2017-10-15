import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Generation } from '../components/generation';

class GenerationContainer extends Component {

    componentDidMount() {
        if(!this.props.generation) {
            this.props.actions.redirect('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.generation) {
            this.props.actions.redirect('/');
        }
    }

    render() {
        if(this.props.generation) {
            return ( 
                <Generation 
                    generation={this.props.generation} 
                    config={this.props.config} 
                    increaseSampleFitness={this.props.actions.increaseSampleFitness}
                    decreaseSampleFitness={this.props.actions.decreaseSampleFitness}
                    generateIndividuals={this.props.actions.generateIndividuals}
                    generateSamples={this.props.actions.generateSamples}
                    generateSampleData={this.props.actions.generateSampleData}
                    evolveGeneration={this.props.actions.evolveIndividuals}
                    lastSampleId={this.props.lastSampleId}
                />
            );
        }

        return <div />;           
         
    }
}

const mapStateToProps = (state, ownProps) => {
    let generation = state.generations.byId[ownProps.match.params.id];

    if(generation) {
        generation = {...generation};
        //Hydrate the individuals
        generation.individuals = generation.individuals.map(n => {
            return state.individuals.byId[n];
        });

        //Hydrate the samples
        generation.samples = generation.samples.map(n => {
            let sample = state.samples.byId[n];
            return {
                ...sample,
                 //Hydrate the samples individual data
                redIndividual: state.individuals.byId[sample.redIndividualId],
                greenIndividual: state.individuals.byId[sample.greenIndividualId],
                blueIndividual: state.individuals.byId[sample.blueIndividualId]
            }
        });
    }
    
    return {
        generation: generation,
        lastSampleId: state.samples.allIds.reduce((n, a) => Math.max(n, a), 0),
        config: state.config
    }
};


export default connect(mapStateToProps)(GenerationContainer);
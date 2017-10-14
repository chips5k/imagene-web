import React, { Component } from 'react';
import * as actionCreators from '../actions/actions';
import { connect } from 'react-redux';
import { Generation } from '../components/generation';
import { push } from 'react-router-redux';

class GenerationContainer extends Component {

    componentDidMount() {
        if(!this.props.generation) {
            this.props.push('/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.generation) {
            this.props.push('/');
        }
    }

    onClickGenerateSamples(numSamples, width, height, redThreshold, greenThreshold, blueThreshold) {
        this.props.onClickGenerateSamples(
            this.props.generation,
            numSamples,
            width,
            height,
            redThreshold,
            greenThreshold,
            blueThreshold,
            this.props.lastSampleId
        );
    }

    render() {
        if(this.props.generation) {
            return ( 
                <Generation 
                    generation={this.props.generation} 
                    config={this.props.config} 
                    onClickGenerateIndividuals={this.props.onClickGenerateIndividuals}
                    onClickEvolveNewGeneration={this.props.evolveIndividuals} 
                    onClickGenerateSamples={this.onClickGenerateSamples.bind(this)}
                    generateSampleData={this.props.generateSampleData}
                    onClickIncreaseSampleFitness={this.props.onClickIncreaseSampleFitness}
                    onClickDecreaseSampleFitness={this.props.onClickDecreaseSampleFitness}
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

const mapDispatchToProps = {
    onClickGenerateIndividuals: actionCreators.generateIndividuals,
    onClickGenerateSamples: actionCreators.generateSamples,
    generateSampleData: actionCreators.generateSampleData,
    evolveIndividuals: actionCreators.evolveIndividuals,
    onClickIncreaseSampleFitness: actionCreators.increaseSampleFitness,
    onClickDecreaseSampleFitness: actionCreators.decreaseSampleFitness,
    push: push
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerationContainer);
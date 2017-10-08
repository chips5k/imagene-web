import React, { Component } from 'react';
import * as actionCreators from '../actions/actions';
import { connect } from 'react-redux';
import { Generation } from '../components/generation';
import { cloneDeep } from 'lodash';
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

    onClickGenerateSamples(generation, config) {
        this.props.onClickGenerateSamples(
            generation.id,
            generation.individuals,
            config.numSamples,
            config.sampleWidth,
            config.sampleHeight,
            [config.redThresholdMin, config.redThresholdMax],
            [config.greenThresholdMin, config.greenThresholdMax],
            [config.blueThresholdMin, config.blueThresholdMax],
            this.props.lastSampleId);
    }

    render() {
        if(this.props.generation) {
            return ( 
                <Generation 
                    generation={this.props.generation} 
                    config={this.props.config} 
                    onClickGenerateIndividuals={this.props.onClickGenerateIndividuals} 
                    onClickGenerateSamples={this.onClickGenerateSamples.bind(this)}
                />
            );
        } 

        return <div />;           
         
    }
}

const mapStateToProps = (state, ownProps) => {
    let generation = cloneDeep(state.generations.byId[ownProps.match.params.id]);

    if(generation) {
        //Hydrate the individuals
        generation.individuals = generation.individuals.map(n => {
            return cloneDeep(state.individuals.byId[n]);
        });

        //Hydrate the samples
        generation.samples = generation.samples.map(n => {
            let sample = cloneDeep(state.samples.byId[n]);
            //Hydrate the samples individual data
            sample.redIndividual = cloneDeep(state.individuals.byId[sample.redIndividualId]);
            sample.greenIndividual = cloneDeep(state.individuals.byId[sample.greenIndividualId]);
            sample.blueIndividual = cloneDeep(state.individuals.byId[sample.blueIndividualId]);
            return sample;
        });
    }
    
    return {
        generation: generation,
        lastSampleId: Math.max(state.samples.allIds),
        config: state.config
    }
};

const mapDispatchToProps = {
    onClickGenerateIndividuals: actionCreators.generateIndividuals,
    onClickGenerateSamples: actionCreators.generateSamples,
    evolveIndividuals: actionCreators.evolveIndividuals,
    push: push
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerationContainer);
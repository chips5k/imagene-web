import { createGeneration, generateIndividuals, generateSamples } from './core';
import { cloneDeep } from 'lodash';

export default {
    generations: (state = [], action) => {

        let index;
      
        //Get the index of this generation
        if(action.generation) {
            index = state.findIndex(n => {
                return action.generation.id === n.id
            });
        }

        switch(action.type) {
            
            case 'NEW_GENERATION':

                if(action.generation) {
                    //New generation from existing
                    return [...state, createGeneration(action.generation)];
                } else if(state.length === 0) {
                    //New Generation
                    return [createGeneration()];
                }

                return state;

            case 'GENERATE_INDIVIDUALS':

                
                if(index !== -1) {
                    
                    let generation = {
                        ...action.generation,
                        size: action.size,
                        minDepth: action.minDepth,
                        maxDepth: action.maxDepth,
                        individuals: generateIndividuals(action.size, action.minDepth, action.maxDepth),
                        samples: []
                    };
                    
                    return [...state.slice(0, index), generation, ...state.slice(index + 1)];
                }

                return state;

            case 'GENERATE_SAMPLES':
                
                
                if(index !== -1) {

                    let generation = {
                        ...action.generation,
                        samples: [...generateSamples(action.generation, action.config), ...action.generation.samples]
                    };
                    
                    return [...state.slice(0, index), generation, ...state.slice(index + 1)];
                }

                return state;
            
            case 'INCREASE_SAMPLE_FITNESS':
            case 'DECREASE_SAMPLE_FITNESS':
                if(index !== -1) {

                    let sampleIndex = action.generation.samples.findIndex(n => action.sample.id === n.id);
                    if(sampleIndex !== -1) {
                        let sample = cloneDeep(action.sample);
                        if(action.type === 'INCREASE_SAMPLE_FITNESS') {
                            sample.fitness++;
                        } else {
                            sample.fitness--;
                        }

                        let samples = [...action.generation.samples.slice(0, sampleIndex), sample, ...action.generation.samples.slice(sampleIndex + 1)];
                        

                        //Find the individuals used by this sample and cascade the fitness values
                        let individuals = [...action.generation.individuals];
                        let fitness = sample.fitness / 3;
                        let individualIds = [sample.redIndividualId, sample.blueIndividualId, sample.greenIndividualId];

                        individuals = individuals.map(n => {
                            if(individualIds.indexOf(n.id) !== -1) {
                                n.fitness += (fitness - n.fitness);
                            };
                            return n;
                        });
                        

                        let generation = {
                            ...action.generation,
                            individuals,
                            samples: samples
                        };
                        
                        return [...state.slice(0, index), generation, ...state.slice(index + 1)];
                    }
                }

                return state;

            default:
                return state;
        }
    }
};

export const individuals = (state = [], action) => {

    switch(action.type) {
        case 'GENERATE_POPULATION':

            let id = 0;
            return [...action.individuals.map(n => { return { ...n, id: ++id }; })];

        break;

        case 'EVOLVE_POPULATION':

           
            let lastId = state.reduce((n, a) => { return Math.max(n, a.id) }, 0);
            
            return [...state, ...action.individuals.map(n => { return {...n, id: ++lastId }})];

        default:
            return state;
    }
}

export const generations = (state = [], action) => {
    switch(action.type) {
        case 'GENERATE_POPULATION':
            console.log('wtf');
            return [{id: action.generationId }];

        case 'EVOLVE_POPULATION':
            return [...state, {id: action.generationId }];

        default:   
            return state;
    }
}
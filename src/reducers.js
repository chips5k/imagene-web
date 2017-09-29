import { createGeneration, generateIndividuals, generateSamples } from './core';


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

            case 'CACHE_SAMPLE_DATA':

                //TODO
                return state;
                break;

            default:
                return state;
        }
    }
};
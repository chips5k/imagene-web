import { generatePopulation, generateSamples } from './core';

let generationId = 0;
let initialPopulation = {
    individuals: [],
    config: {
        size: 0,
        minDepth: 0,
        maxDepth: 0
    }
};

export default {
    population: (state = initialPopulation, action) => { 
        switch(action.type) {
            case 'UPDATE_POPULATION':
                try {
                    return {
                        config: action.population.config,
                        individuals: 
                        generatePopulation(
                            action.population.config.size, 
                            action.population.config.minDepth, 
                            action.population.config.maxDepth
                        )
                    };
                } catch(e) {
                    console.log(e);
                    //Could push to global error stack
                    return state;
                }
                
            default:
                return state;
        } 
    },
    
    generations: (state = [], action) => {
        switch(action.type) {
            case 'NEW_GENERATION':
                return [{
                    id: ++generationId, 
                    config: {
                        numSamples: 6,
                        sampleWidth: 320,
                        sampleHeight: 320,
                        redThresholdMin: 0,
                        redThresholdMax: 255,
                        greenThresholdMin: 0,
                        greenThresholdMax: 255,
                        blueThresholdMin: 0,
                        blueThresholdMax: 255,
                        useDecimalJs: false
                    }, 
                    population: action.population,
                    samples: []
                }];
            break;

            case 'UPDATE_GENERATION':
                //Find the config to be updated
                
                let generationIndex = state.findIndex(n => n.id === action.generation.id);

                if(generationIndex !== -1) {
                  
                    let generation = {...action.generation, samples: generateSamples(action.generation) };
                    return [...state.slice(0, generationIndex - 1), generation, ...state.slice(generationIndex + 1)];
                } else {
                    return state;
                }
                
            default:
                return state;
        }
    }
};
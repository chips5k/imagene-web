import { generatePopulation, generateSamples } from './core';

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
            case 'UPDATE_GENERATION':
                if(action.generation.id) {
                    //Find the config to be updated
                    let generationIndex = state.indexOf(n => n.id === action.generation.id);
                    if(generationIndex !== -1) {
                        let generation = {
                            id: action.id,
                            config: action.generation.config,
                            population: action.generation.population,
                            samples: generateSamples(action.generation)
                        };
                        
                        return [...state.slice(0, generationIndex - 1), generation, ...state.slice(generationIndex + 1)];
                    } else {
                        return state;
                    }
                } else {
                    return [{
                        id: 1, 
                        config: action.generation.config, 
                        population: action.generation.population,
                        samples: generateSamples(action.generation)
                    }];
                }
                
            default:
                return state;
        }
    }
};
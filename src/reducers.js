import { generatePopulation, getRandomInt, generateSamples } from './core';

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
                
                return {...action.population}
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
                    
                    let generation = {
                        id: action.id,
                        config: action.config,
                        samples: generateSamples(action.generation)
                    };

                    if(generationIndex !== -1) {
                        return [...state.slice(0, generationIndex - 1), generation, ...state.slice(generationIndex + 1)];
                    } else {
                        return state;
                    }

                } else {
                    return [{
                        id: 1, 
                        config: action.config, 
                        samples: generateSamples(action.generation)
                    }];
                }
                
            default:
                return state;
        }
    },
    // generations: (state = {generations: [], generationConfigs: []}, action, generationConfigs) => {
    //     switch(action.type) {
    //         case 'UPDATE_GENERATION':

    //             //WHEN to do mutations ?
    //             let population = [...action.population];
    //             let samples = [];
    //             for(var i = 0; i < action.generationConfig.numSamples; i++) {
    //                 samples.push({
    //                     id: i + 1,
    //                     red: population[getRandomInt(0, population.length)].id,
    //                     green: population[getRandomInt(0, population.length)].id,
    //                     blue:population[getRandomInt(0, population.length)].id,
    //                 });
    //             }

    //             return {generations: [{
    //                 id: action.generationConfig.id,
    //                 population,
    //                 samples
    //             }], generationConfigs};

    //         break;
    //         default:
    //             return state;
    //     }
    // }
};
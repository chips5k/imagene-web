import { cloneDeep } from 'lodash';

//             case 'GENERATE_SAMPLES':
                
                
//                 if(index !== -1) {

//                     let generation = {
//                         ...action.generation,
//                         samples: [...generateSamples(action.generation, action.config), ...action.generation.samples]
//                     };
                    
//                     return [...state.slice(0, index), generation, ...state.slice(index + 1)];
//                 }

//                 return state;
            
//             case 'INCREASE_SAMPLE_FITNESS':
//             case 'DECREASE_SAMPLE_FITNESS':
//                 if(index !== -1) {

//                     let sampleIndex = action.generation.samples.findIndex(n => action.sample.id === n.id);
//                     if(sampleIndex !== -1) {
//                         let sample = cloneDeep(action.sample);
//                         if(action.type === 'INCREASE_SAMPLE_FITNESS') {
//                             sample.fitness++;
//                         } else {
//                             sample.fitness--;
//                         }

//                         let samples = [...action.generation.samples.slice(0, sampleIndex), sample, ...action.generation.samples.slice(sampleIndex + 1)];
                        

//                         //Find the individuals used by this sample and cascade the fitness values
//                         let individuals = [...action.generation.individuals];
//                         let fitness = sample.fitness / 3;
//                         let individualIds = [sample.redIndividualId, sample.blueIndividualId, sample.greenIndividualId];

//                         individuals = individuals.map(n => {
//                             if(individualIds.indexOf(n.id) !== -1) {
//                                 n.fitness += (fitness - n.fitness);
//                             };
//                             return n;
//                         });
                        

//                         let generation = {
//                             ...action.generation,
//                             individuals,
//                             samples: samples
//                         };
                        
//                         return [...state.slice(0, index), generation, ...state.slice(index + 1)];
//                     }
//                 }

//                 return state;

//             default:
//                 return state;
//         }
//     }
// };

export const individuals = (state = { byId: {}, allIds: []}, action) => {

    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION':
            return {
                byId: {},
                allIds: []
            };
        
        case 'GENERATE_INDIVIDUALS':

            let newState = {
                byId: {},
                allIds: []
            };
            
            for(var i = 0; i < action.individuals.length; i++) {
                let individual = cloneDeep(action.individuals[i]);
                newState.byId[individual.id] = individual;
                newState.allIds.push(individual.id);
            }

            return newState;

        case 'EVOLVE_INDIVIDUALS':

            let lastId = state.reduce((n, a) => { return Math.max(n, a.id) }, 0);
            return [...state, ...action.individuals.map(n => { return {...n, id: ++lastId }})];

        default:
            return state;
    }
}

export const generations = (state = { byId: {}, allIds: []}, action) => {
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION':
        return {
            byId: {
                [action.generationId]: {
                    id: action.generationId,
                    individuals: [],
                    samples: []
                }
            },
            allIds: [action.generationId]
        };

        case 'GENERATE_INDIVIDUALS':
            
            return {
                byId: {
                    [action.generationId]: {
                        id: action.generationId,
                        individuals: action.individuals.map(n => n.id),
                        samples: []
                    }
                },
                allIds: [action.generationId]
            }

        case 'EVOLVE_INDIVIDUALS':
            return [...state, { id: action.generationId, individuals: action.individuals.map(n => n.id) }];
        
        case 'GENERATE_SAMPLES':
            let newState = cloneDeep(state);
            newState.byId[action.generationId].samples = [...newState.byId[action.generationId].samples, ...action.samples.map(n => n.id)];
            return newState;
            
        default:   
            return state;
    }
}

export const samples = (state = { byId: {}, allIds: []}, action) => {
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION':
        return {
            byId:{},
            allIds: []
        };

        case 'GENERATE_SAMPLES':

            let newState = cloneDeep(state);
            for(var i = 0; i < action.samples.length; i++) {
                newState.byId[action.samples[i].id] = cloneDeep(action.samples[i]);
                newState.allIds.push(action.samples[i].id);
            }

            return newState;

        default:
            return state;
    }
}

export const config = (state = { numberOfIndividuals: 0, minExpressionDepth: 0, maxExpressionDepth: 12}, action) => {
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION':
            return {
                numberOfIndividuals: 24,
                minExpressionDepth: 0,
                maxExpressionDepth: 12
            };
            
        case 'GENERATE_INDIVIDUALS':
            return {
                numberOfIndividuals: action.individuals.length,
                minExpressionDepth: action.minExpressionDepth,
                maxExpressionDepth: action.maxExpressionDepth
            };

        default:
            return state;
    }
}

export default {
    config,
    individuals,
    generations,
    samples
};
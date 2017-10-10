import { cloneDeep } from 'lodash';

export const individuals = (state = { byId: {}, allIds: []}, action) => {

    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION': {
            return {
                byId: {},
                allIds: []
            };
        }
        
        case 'GENERATE_INDIVIDUALS': {

            let newState = {
                byId: {},
                allIds: []
            };
            
            for(let i = 0; i < action.individuals.length; i++) {
                let individual = {...action.individuals[i] };
                newState.byId[individual.id] = individual;
                newState.allIds.push(individual.id);
            }

            return newState;
        }

        case 'EVOLVE_INDIVIDUALS': {

            let newState = {
                byId: {},
                allIds: []
            };

            let minId = action.individuals.reduce((n, a) => Math.min(typeof n === 'object' ? n.id : n, a.id));
            
            for(let i = 0; i < state.allIds.length; i++) {
                if(state.allIds[i] < minId) {
                    newState.byId[state.allIds[i]] = {...state.byId[state.allIds[i]]};
                    newState.allIds.push(state.allIds[i]);
                }
            }
            
            for(let i = 0; i < action.individuals.length; i++) {
                if(state.byId[action.individuals[i].id]) {
                    if(state.byId[action.individuals[i].id].generationId !== action.individuals[i].generationId) {
                        return state;
                    }
                }
                newState.byId[action.individuals[i].id] = {
                    ...action.individuals[i]
                };
                newState.allIds.push(action.individuals[i].id);
            }
            
            return newState;
        }

        case 'INCREASE_SAMPLE_FITNESS': {
            let redIndividual = state.byId[action.redIndividualId];
            let greenIndividual = state.byId[action.greenIndividualId];
            let blueIndividual = state.byId[action.blueIndividualId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [redIndividual.id]: {
                        ...redIndividual,
                        fitness: redIndividual.fitness + 1,
                    },
                    [greenIndividual.id]: {
                        ...greenIndividual,
                        fitness: greenIndividual.fitness + 1,
                    },
                    [blueIndividual.id]: {
                        ...blueIndividual,
                        fitness: blueIndividual.fitness + 1,
                    }
                }
            }
        }
    
        case 'DECREASE_SAMPLE_FITNESS': {
            let redIndividual = state.byId[action.redIndividualId];
            let greenIndividual = state.byId[action.greenIndividualId];
            let blueIndividual = state.byId[action.blueIndividualId];

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [redIndividual.id]: {
                        ...redIndividual,
                        fitness: redIndividual.fitness - 1 < 0 ? 0 : redIndividual.fitness - 1,
                    },
                    [greenIndividual.id]: {
                        ...greenIndividual,
                        fitness: greenIndividual.fitness - 1 < 0 ? 0 : greenIndividual.fitness - 1,
                    },
                    [blueIndividual.id]: {
                        ...blueIndividual,
                        fitness: blueIndividual.fitness - 1 < 0 ? 0 : blueIndividual.fitness - 1,
                    }
                }
            }
        }
        
        default:
            return state;
    }
}

export const generations = (state = { byId: {}, allIds: []}, action) => {
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION': {
            return {
                byId: {
                    [action.generationId]: {
                        id: action.generationId,
                        individuals: [],
                        samples: []
                    }
                },
                allIds: [action.generationId]
            }
        }

        case 'GENERATE_INDIVIDUALS': {
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
        }

        case 'EVOLVE_INDIVIDUALS': {

            let newState = {
                byId: {},
                allIds: []
            };

            for(let i = 0; i < state.allIds.length; i++) {
                if(state.allIds[i] < action.generationId) {
                    newState.byId[state.allIds[i]] = {...state.byId[state.allIds[i]]};
                    newState.allIds.push(state.allIds[i]);
                }
            }
            
            newState.byId[action.generationId] = {
                id: action.generationId,
                individuals: action.individuals.map(n => n.id),
                samples: []
            };

            newState.allIds.push(action.generationId);
            
            return newState;
            
        }
        
        case 'GENERATE_SAMPLE': {
            let generation = state.byId[action.generationId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.generationId]: {
                        ...generation, 
                        samples: [...generation.samples, action.sample.id]
                    }
                }
            }
        }

        default: { 
            return state;
        }
    }
}

export const samples = (state = { byId: {}, allIds: []}, action) => {
    
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION': {
            return {
                byId:{},
                allIds: []
            }
        }

        case 'GENERATE_SAMPLE': {
            return {
                byId: {
                    ...state.byId,
                    [action.sample.id]: cloneDeep(action.sample)
                },
                allIds: [...state.allIds, action.sample.id]
            }
        }
        
        case 'SAMPLE_DATA_GENERATING': {
            let sample = state.byId[action.sampleId];
            
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [sample.id]: {
                        ...sample,
                        processing: true
                    }
                }
            };
        }

        case 'SAMPLE_DATA_GENERATED': {
            
            let sample = state.byId[action.sampleId];
            let key = action.coordinateType;
            
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [sample.id]: {
                        ...sample,
                        cache: {
                            ...sample.cache,
                            [key]: Uint8ClampedArray.from(action.data)
                        },
                        processing: false
                    }
                }
            }
        }

        case 'INCREASE_SAMPLE_FITNESS': {
            let sample = state.byId[action.sampleId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [sample.id]: {
                        ...sample,
                        fitness: sample.fitness + 1,
                    }
                }
            }
        }

        case 'DECREASE_SAMPLE_FITNESS': {
            let sample = state.byId[action.sampleId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [sample.id]: {
                        ...sample,
                        fitness: sample.fitness - 1 < 0 ? 0 : sample.fitness - 1,
                    }
                }
            }
        }

        default: {
            return state;
        }
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
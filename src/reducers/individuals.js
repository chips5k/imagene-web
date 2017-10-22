export default (state = { byId: {}, allIds: []}, action) => {
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
                        fitness: redIndividual.fitness + (1/3),
                    },
                    [greenIndividual.id]: {
                        ...greenIndividual,
                        fitness: greenIndividual.fitness + (1/3),
                    },
                    [blueIndividual.id]: {
                        ...blueIndividual,
                        fitness: blueIndividual.fitness + (1/3),
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
                        fitness: redIndividual.fitness - 1 < 0 ? 0 : redIndividual.fitness - (1/3),
                    },
                    [greenIndividual.id]: {
                        ...greenIndividual,
                        fitness: greenIndividual.fitness - 1 < 0 ? 0 : greenIndividual.fitness - (1/3),
                    },
                    [blueIndividual.id]: {
                        ...blueIndividual,
                        fitness: blueIndividual.fitness - 1 < 0 ? 0 : blueIndividual.fitness - (1/3),
                    }
                }
            }
        }
        
        default:
            return state;
    }
}
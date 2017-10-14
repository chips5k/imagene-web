export default (state = { byId: {}, allIds: []}, action) => {
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

            //First check if any of the supplied individual ids already exist in previous generations
            for(let i = 0; i < state.allIds.length; i++) {
                let gen = state.byId[state.allIds[i]];
                
                let conflicts = action.individuals.filter(n => gen.individuals.indexOf(n) !== -1);
                if(conflicts.length > 0) {
                    return state;
                }
            }


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
        
        case 'GENERATE_SAMPLES': {
            let generation = state.byId[action.generationId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.generationId]: {
                        ...generation, 
                        samples: [...generation.samples, ...action.samples.map(n => n.id)]
                    }
                }
            }
        }

        default: { 
            return state;
        }
    }
}

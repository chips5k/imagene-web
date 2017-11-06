import {cloneDeep} from 'lodash';

export default (state = { byId: {}, allIds: []}, action) => {
    switch(action.type) {
        case 'CREATE_INITIAL_GENERATION':
        case 'GENERATE_INDIVIDUALS': {
            return {
                byId:{},
                allIds: []
            }
        }

        case 'GENERATE_SAMPLES': {
            let newState = {
                byId: {...state.byId},
                allIds: [...state.allIds]
            };

            action.samples.forEach(n => {
                newState.byId[n.id] = cloneDeep(n)
            });

            newState.allIds = Object.keys(newState.byId).map(n => parseInt(n, 10));

            return newState;
        }

        case 'UPDATE_SAMPLES': {
            let newState = {
                byId: {...state.byId},
                allIds: [...state.allIds]
            }

            action.samples.forEach(n => {
                newState.byId[n.id] = {...cloneDeep(n), cache: {}}
            });

            return newState;
        }

        case 'REMOVE_SAMPLES': {

            let byId = {};
            let allIds = state.allIds.filter(n => {
                if(state.byId[n].generationId === action.generationId) {
                    if(action.sampleIds.length > 0) {
                       if(action.sampleIds.indexOf(n) !== -1) {
                           return false;
                       }
                    } else {
                        return false;
                    }
                }
                return true;
            });

            allIds.forEach(n => {
                byId[n] = {...state.byId[n]}
            });
            

            return {
                byId, allIds
            };
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

        case 'SAMPLE_EXPORT_DATA_GENERATING': {

            let newState = {...state};
            let exportTypes = {};

            action.coordinateTypes.forEach(n => {
                exportTypes[n] = []
            });

            action.sampleIds.forEach(n => {
                newState.byId[n] = {
                    ...newState.byId[n],
                    exporting: true,
                    exports: exportTypes
                }
            });

            return newState;
        }

        case 'SAMPLE_EXPORT_DATA_GENERATED': {
            
            let sample = state.byId[action.sampleId];
            let key = action.coordinateType;

            let exporting = true;
            let completed = 1;
            for(let i in state.byId[action.sampleId].exports) {
                if(i !== action.coordinateType) {
                    if(state.byId[action.sampleId].exports[i].length > 0) {
                        completed++;
                    }
                }
            }

            if(completed === Object.keys(state.byId[action.sampleId].exports).length) {
                exporting = false;
            }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [sample.id]: {
                        ...sample,
                        exports: {
                            ...sample.exports,
                            [key]: Uint8ClampedArray.from(action.data)
                        },
                        exporting
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
                        fitness: sample.fitness - 1,
                    }
                }
            }
        }

        default: {
            return state;
        }
    }
}
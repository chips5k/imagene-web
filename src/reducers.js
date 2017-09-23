

let initialState = {
    size: 0,
    minDepth: 0,
    maxDepth: 0
};

export default {
    populationConfig: (state = initialState, action) => { 
        switch(action.type) {
            
            case 'UPDATE_POPULATION_CONFIG':
                return {...state, ...action.populationConfig};
            default:
                return state;
        } 
    },
    population: (state = [], action) => {
        switch(action.type) {
            case 'UPDATE_POPULATION_CONFIG':
                return [['pX', 'pY', '+']];
            default:
                return state;
        }
    },
    generationConfigs: (state = [], action) => {
        switch(action.type) {
            case 'UPDATE_POPULATION_CONFIG':
                return [{
                    id: 0,
                    minRed: 0,
                    maxRed: 255,
                    minGreen: 0,
                    maxGreen: 0,
                    numSamples: 6,
                    sampleWidth: 320,
                    sampleHeight: 320,
                    minBlue: 0,
                    maxBlue: 255
                }];

            default:
                return state;
        }
    },
    generations: (state = [], action) => {
        return state;
    }
};
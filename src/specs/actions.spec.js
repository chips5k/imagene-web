jest.mock('../core.js');
import * as core from '../core';
import * as actionCreators from '../actions.js';

describe('generatePopulation', () => {

    it('Should generate an action object containing a population', () => {
        
        core.generateIndividuals.mockImplementation(() => {
            return ['test', 'test', 'test', 'test'];
        });

        let action = {
            type: 'GENERATE_POPULATION',
            individuals: ['test', 'test', 'test', 'test'],
            minExpressionDepth: 0,
            maxExpressionDepth: 12
        };

        expect(actionCreators.generatePopulation(4, 0, 12)).toEqual(action);
    });
});


describe('evolvePopulation', () => {

    it('Should generate an action object containing an evolved set of individuals', () => {
            
        core.evolveIndividuals.mockImplementation(() => {
            return ['test', 'test', 'test', 'test'];
        });

        let action = {
            type: 'EVOLVE_POPULATION',
            individuals: ['test', 'test', 'test', 'test']
        };

        expect(actionCreators.evolvePopulation(1, ['test', 'test'])).toEqual(action);

    });
});

describe('generateSamples', () => {
    it('should generate an action object containing a set of samples and the generation id they belong to', () => {

        core.createSample.mockImplementation(() => {
            return 'test'
        });
        
        let action = {
            type: 'GENERATE_SAMPLES',
            samples: ['test', 'test', 'test']
        };

        expect(actionCreators.generateSamples(1, ['test'], 3, 320, 320, [0, 255], [0, 255], [0, 255])).toEqual(action);

    });
});

// describe('regenerateSample', () => {
   
// });

// describe('increaseSampleFitness', () => {
    
// });

// describe('decreaseSampleFitness', () => {
    
// });
// jest.mock('../../lib/core.js');
// import * as core from '../../lib/core';
// import * as actionCreators from '../../actions/actions.js';

describe('actions', () => {
    it('works', () => {
        
    });
});


// describe('generatePopulation', () => {

//     it('Should generate an action object containing a population with unique ids', () => {
        
//         let individuals = [{ test: 'a' }, {test: 'b', test: 'c', test: 'd'}];
//         core.generateIndividuals.mockImplementation(() => {
//             return individuals;
//         });

//         let id = 0;

//         let action = {
//             type: 'GENERATE_POPULATION',
//             generationId: 1,
//             individuals: individuals.map(n => { return {...n, generationId: 1, id: ++id }; }),
//             minExpressionDepth: 0,
//             maxExpressionDepth: 12
//         };

//         expect(actionCreators.generatePopulation(4, 0, 12)).toEqual(action);
//     });
// });


// describe('evolvePopulation', () => {

//     it('Should generate an action object containing an evolved set of individuals with unique ids', () => {
            
//         core.evolveIndividuals.mockImplementation(() => {
//             return [{ test: 'c'} , { test: 'd'}];
//         });
    
//         let action = {
//             type: 'EVOLVE_POPULATION',
//             generationId: 2,
//             individuals: [{ generationId: 2, id: 5, test: 'c' }, { generationId: 2, id: 6, test: 'd' }]
//         };

//         expect(actionCreators.evolvePopulation(1, [{ generationId: 1, id: 3, test: 'a'}, { generationId: 1, id: 4, test: 'b'}], 4)).toEqual(action);
//     });
// });

// describe('generateSamples', () => {
//     it('should generate an action object containing a set of samples with unique ids and the generation id they belong to', () => {

//         core.createSample.mockImplementation(() => {
//             return { test: 'a' }
//         });
        
//         let action = {
//             type: 'GENERATE_SAMPLES',
//             generationId: 1,
//             samples: [{ generationId: 1, id: 1, test: 'a' }, { generationId: 1, id: 2, test: 'a'}, { generationId: 1, id: 3, test: 'a' }]
//         };

//         expect(actionCreators.generateSamples(1, ['test'], 3, 320, 320, [0, 255], [0, 255], [0, 255], 0)).toEqual(action);

//     });
// });

// describe('regenerateSample', () => {
   
// });

// describe('increaseSampleFitness', () => {
    
// });

// describe('decreaseSampleFitness', () => {
    
// });
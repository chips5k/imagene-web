jest.mock('../../lib/expressions.js');
jest.mock('../../lib/generationSampleWorkerQueue');
jest.mock('../../lib/GenerationSampleWorker.worker', () => {
    
});
import GenerationSampleWorker from '../../lib/GenerationSampleWorker.worker';
import addToWorkerQueue from '../../lib/generationSampleWorkerQueue';
import { selectToken } from '../../lib/core';
import * as actions from '../../actions/actions.js';
import { push } from 'react-router-redux';



describe('actions', () => {

    describe('createInitialGeneration', () => {

        it('should dispatch a create initial generation event, and dispatch a router change to the specified generation', () => {
            const dispatch = jest.fn();
            
            actions.createInitialGeneration()(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: 'CREATE_INITIAL_GENERATION',
                generationId: 1
            });

            expect(dispatch).toHaveBeenLastCalledWith(push('generation/1'));
        });
    });

    describe('generateIndividuals', () => {

        selectToken.mockImplementation((n) => {
            return ['a'];
        });

        it('generates unique individuals', () => {
            
            expect(actions.generateIndividuals(3, 4, 8)).toEqual({
                type: 'GENERATE_INDIVIDUALS', 
                generationId: 1,
                individuals: [
                    { generationId: 1, id: 1, expression: ['a'], fitness: 3 }, 
                    { generationId: 1, id: 2, expression: ['a'], fitness: 3 }, 
                    { generationId: 1, id: 3, expression: ['a'], fitness: 3 }
                ],
                minExpressionDepth: 4,
                maxExpressionDepth: 8
            }); 
        });

        it('sets the indidividuals fitness level to the total number of individuals', () => {
            expect(actions.generateIndividuals(2, 6, 12)).toEqual({
                type: 'GENERATE_INDIVIDUALS', 
                generationId: 1,
                individuals: [
                    { generationId: 1, id: 1, expression: ['a'], fitness: 2 }, 
                    { generationId: 1, id: 2, expression: ['b'], fitness: 2 }
                ],
                minExpressionDepth: 6,
                maxExpressionDepth: 12
            }); 
        });
        
    });

    // describe('evolveIndividuals', () => {
    //     it('should evolve the supplied individuals into a new set of individuals, with the same fitness values, but new generation and id values', () => {
    //         core.evolveIndividuals.mockImplementation((individuals) => {
    //             return [
    //                 {
    //                     id: 1,
    //                     generationId: 1,
    //                     expression: ['x'],
    //                     fitness: 12
    //                 },
    //                 {
    //                     id: 2,
    //                     generationId: 1,
    //                     expression: ['y'],
    //                     fitness: 3
    //                 },
    //                 {
    //                     id: 3,
    //                     generationId: 1,
    //                     expression: ['z'],
    //                     fitness: 4
    //                 }
    //             ];
    //         });

    //         expect(actions.evolveIndividuals({
    //             id: 1,
    //             individuals: [{
    //                 id: 1,
    //                 generationId: 1,
    //                 expression: ['a'],
    //                 fitness: 12
    //             },
    //             {
    //                 id: 2,
    //                 generationId: 1,
    //                 expression: ['b'],
    //                 fitness: 3
    //             },
    //             {
    //                 id: 3,
    //                 generationId: 1,
    //                 expression: ['c'],
    //                 fitness: 4
    //             }]
    //         })).toEqual({
    //             type: 'EVOLVE_INDIVIDUALS',
    //             generationId: 2,
    //             individuals: [
    //                 {
    //                     id: 4,
    //                     generationId: 2,
    //                     expression: ['x'],
    //                     fitness: 12
    //                 },
    //                 {
    //                     id: 5,
    //                     generationId: 2,
    //                     expression: ['y'],
    //                     fitness: 3
    //                 },
    //                 {
    //                     id: 6,
    //                     generationId: 2,
    //                     expression: ['z'],
    //                     fitness: 4
    //                 }
    //             ]
    //         });
    //     });
    // });

    describe('generateSamples', () => {

        it('should generate samples according to the supplied input', () => {
            let lastSelection = 0;
            core.rouletteWheelSelection = jest.fn((individuals, excludedIndexes) => {
                if(lastSelection > 2) {
                    lastSelection = 0;
                }
                return lastSelection++;
            });

            const generation = {
                id: 1,
                individuals: [
                    { id: 1 }, { id: 2 }, { id: 3 }
                ]
            };

            const numSamples = 4;
            const width = 320;
            const height = 340;
            const redThreshold = [0, 255];
            const greenThreshold = [12, 128];
            const blueThreshold = [66, 100];
            let lastSampleId = 0;
            
            expect(
                actions.generateSamples(
                    generation,
                    numSamples,
                    width,
                    height,
                    redThreshold,
                    greenThreshold,
                    blueThreshold,
                    lastSampleId
                )
            ).toEqual({
                type: 'GENERATE_SAMPLES',
                generationId: 1,
                samples: [
                    {
                        id: ++lastSampleId,
                        generationId: 1,
                        redIndividualId: 1,
                        greenIndividualId: 2,
                        blueIndividualId: 3,
                        width, 
                        height,
                        redThreshold, 
                        greenThreshold, 
                        blueThreshold,
                        cache: {
                            polar: null,
                            cartesian: null
                        },
                        fitness: 0,
                        processing: false
                    },
                    {
                        id: ++lastSampleId,
                        generationId: 1,
                        redIndividualId: 1,
                        greenIndividualId: 2,
                        blueIndividualId: 3,
                        width, 
                        height,
                        redThreshold, 
                        greenThreshold, 
                        blueThreshold,
                        cache: {
                            polar: null,
                            cartesian: null
                        },
                        fitness: 0,
                        processing: false
                    },
                    {
                        id: ++lastSampleId,
                        generationId: 1,
                        redIndividualId: 1,
                        greenIndividualId: 2,
                        blueIndividualId: 3,
                        width, 
                        height,
                        redThreshold, 
                        greenThreshold, 
                        blueThreshold,
                        cache: {
                            polar: null,
                            cartesian: null
                        },
                        fitness: 0,
                        processing: false
                    },
                    {
                        id: ++lastSampleId,
                        generationId: 1,
                        redIndividualId: 1,
                        greenIndividualId: 2,
                        blueIndividualId: 3,
                        width, 
                        height,
                        redThreshold, 
                        greenThreshold, 
                        blueThreshold,
                        cache: {
                            polar: null,
                            cartesian: null
                        },
                        fitness: 0,
                        processing: false
                    }
                ]
            });

            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, []);
            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, [0]);
            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, [0, 1]);

        }); 

        it('should assign unique ids based on last sample id', () => {
            let lastSelection = 0;
            core.rouletteWheelSelection = jest.fn((individuals, excludedIndexes) => {
                return lastSelection++;
            });

            const generation = {
                id: 1,
                individuals: [
                    { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 8 }
                ]
            };

            const numSamples = 1;
            const width = 320;
            const height = 340;
            const redThreshold = [0, 255];
            const greenThreshold = [12, 128];
            const blueThreshold = [66, 100];
            let lastSampleId = 8;
            
            expect(
                actions.generateSamples(
                    generation,
                    numSamples,
                    width,
                    height,
                    redThreshold,
                    greenThreshold,
                    blueThreshold,
                    lastSampleId
                )
            ).toEqual({
                type: 'GENERATE_SAMPLES',
                generationId: 1,
                samples: [
                    {
                        id: ++lastSampleId,
                        generationId: 1,
                        redIndividualId: 1,
                        greenIndividualId: 2,
                        blueIndividualId: 3,
                        width, 
                        height,
                        redThreshold, 
                        greenThreshold, 
                        blueThreshold,
                        cache: {
                            polar: null,
                            cartesian: null
                        },
                        fitness: 0,
                        processing: false
                    }
                ]
            });

            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, []);
            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, [0]);
            expect(core.rouletteWheelSelection).toHaveBeenCalledWith(generation.individuals, [0, 1]);
        });
        

        it('should not generate samples that contain previous individual combinations for R G and B', () => {
            
        });

    });


    describe('generateSampleData', () => {
       
        it('should dispatch multiple actions and defer generation to a worker queue', () => {
            const dispatch = jest.fn();
            const sample = {
                id: 1
            };

            const coordinateType = 'cartesian';
            
            addToWorkerQueue.mockImplementation(({sample, coordinateType}, callback) => {
                expect(sample).toEqual(sample);
                expect(coordinateType).toEqual(coordinateType);
                callback({data: []});
            });

            

            actions.generateSampleData(sample, coordinateType)(dispatch);

            expect(dispatch).toHaveBeenCalledWith({
                type: 'SAMPLE_DATA_GENERATING',
                sampleId: sample.id,
                coordinateType: coordinateType
            });

            expect(addToWorkerQueue).toHaveBeenCalled();

            expect(dispatch).toHaveBeenLastCalledWith({
                type: 'SAMPLE_DATA_GENERATED',
                sampleId: sample.id,
                data: [],
                coordinateType: coordinateType
            });
        }); 

    });
    
    describe('increaseSampleFitness', () => {

        it('generates the correct action', () => {
            expect(actions.increaseSampleFitness({id: 1, redIndividualId: 2, greenIndividualId: 3, blueIndividualId: 4})).toEqual({
                type: 'INCREASE_SAMPLE_FITNESS',
                sampleId: 1,
                redIndividualId: 2,
                greenIndividualId: 3,
                blueIndividualId: 4
            });
        });

    });

    describe('decreaseSampleFitness', () => {
        it('generates the correct action', () => {
            expect(actions.decreaseSampleFitness({id: 1, redIndividualId: 2, greenIndividualId: 3, blueIndividualId: 4})).toEqual({
                type: 'DECREASE_SAMPLE_FITNESS',
                sampleId: 1,
                redIndividualId: 2,
                greenIndividualId: 3,
                blueIndividualId: 4
            });
        });
    }); 

});


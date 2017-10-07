import * as reducers from '../reducers';

describe('reducers', () => {

    describe('individuals', () => {
        
        it('should add individuals to state upon GENERATE_POPULATION action', () => {
            let expectedState = [
                {
                    generationId: 1,
                    id: 1,
                    test: 'a'
                },
                {
                    generationId: 1,
                    id: 2,
                    test: 'b'
                },
                {
                    generationId: 1,
                    id: 3,
                    test: 'c'
                }
            ];


            let actualState = reducers.individuals([], {
                type: 'GENERATE_POPULATION',
                individuals: expectedState,
                minExpressionDepth: 0,
                maxExpressionDepth: 1
            });

            expect(expectedState).toEqual(actualState);
        });

        it('should clear the previous individuals upon GENERATE_POPULATION action', () => {
            
            let previousState = [
                {
                    generationId: 1,
                    id: 1,
                    test: 'a'
                },
                {
                    generationId: 1,
                    id: 2,
                    test: 'b'
                },
                {
                    generationId: 1,
                    id: 3,
                    test: 'c'
                }
            ];

            let expectedState =  [{generationId: 1, id: 1, test: 'x'}]
            
            let newState = reducers.individuals(previousState, {
                type: 'GENERATE_POPULATION',
                individuals: expectedState,
                minExpressionDepth: 0,
                maxExpressionDepth: 1
            })

            expect(newState).toEqual(expectedState);
        });
        
        it('should append evolved individuals to state upon EVOLVE_GENERATION', () => {
            
            let initialState = [
                {
                    generationId: 1,
                    id: 1,
                    test: 'a'
                },
                {
                    generationId: 1,
                    id: 2,
                    test: 'b'
                }
            ];

            let newIndividiuals = [
                {
                    generationId: 2,
                    id: 3,
                    test: 'y'
                },
                {
                    generationId: 2,
                    id: 4,
                    test: 'x'
                }
            ];

            let newState = reducers.individuals(initialState, {
                type: 'EVOLVE_POPULATION',
                generationId: 2,
                individuals: newIndividiuals
            });

            expect(newState).toEqual([...initialState, ...newIndividiuals]);

        })
    });

    describe('generations', () => {

        
        it('should clear existing generations and store the new one upon GENERATE_POPULATION action', () => {

            let initialState = [{ id: 1, individuals: [1, 2]}, { id: 2, individuals: [3, 4]}]
            let expectedState = [{ id: 5, individuals: [5, 6] }];

            let state = reducers.generations(initialState, {
                type: 'GENERATE_POPULATION',
                generationId: 5,
                individuals: [{ id: 5}, {id: 6}]
            });

            expect(state).toEqual(expectedState);

        });

        
        it('should append the new generation to state upon EVOLVE_POPULATION action', () => {
            let initialState = [{id: 1}];

            let state = reducers.generations(initialState, {
                type: 'EVOLVE_POPULATION', 
                generationId: 2,
                individuals: [{ id: 1}, { id: 2}]
            });

            expect(state).toEqual([
                ...initialState,
                {
                    id: 2,
                    individuals: [1, 2]
                }
            ]);
        })

    });

    describe('samples', () => {

    });

    describe('operands', () => {

    });

    describe('singleOperators', () => {

    });

    describe('doubleOperators', () => {

    });

    describe('config', () => {
        
        it('should update store with newly used config options upon GENERATE_POPULATION action', () => {
            expect(reducers.config(null, {
                type: 'GENERATE_POPULATION',
                generationId: 1,
                individuals: ['test 1', 'test 2'],
                minExpressionDepth: 2,
                maxExpressionDepth: 6
            })).toEqual({
                numberOfIndividuals: 2,
                minExpressionDepth: 2,
                maxExpressionDepth: 6
            });
        }); 

        it('should not be affected by EVOLVE_POPULATION action', () => {
            expect(reducers.config(
                {
                    numberOfIndividuals: 3,
                    minExpressionDepth: 7,
                    maxExpressionDepth: 8
                
                }, {
                type: 'EVOLVE_POPULATION',
                generationId: 1,
                individuals: ['test 1', 'test 2'],
                minExpressionDepth: 2,
                maxExpressionDepth: 6
            })).toEqual({
                numberOfIndividuals: 3,
                minExpressionDepth: 7,
                maxExpressionDepth: 8
            });
        })
    });
});
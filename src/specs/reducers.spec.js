import * as reducers from '../reducers';

describe('reducers', () => {

    describe('individuals', () => {
        describe('GENERATE_POPULATION', () => {
            it('should add individuals to state', () => {
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

            it('should clear the previous individuals', () => {
                
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
        });
        
        describe('EVOLVE_POPULATION', () => {
            it('should append evolved individuals to state', () => {
                
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
        })
    });

    describe('generations', () => {

        describe('GENERATE_POPULATION', () => {
            it('should clear existing generations and store the new one', () => {

                let initialState = [{ id: 1, test: 'a'}, { id: 2, test: 'b'}]
                let expectedState = [{ id: 1 }];

                let state = reducers.generations(initialState, {
                    type: 'GENERATE_POPULATION',
                    generationId: 1,
                    individuals: []
                });

                expect(state).toEqual(expectedState);

            });
        });

        describe('EVOLVE_POPULATION', () => {
            it('should append the new generation to state', () => {
                let initialState = [{id: 1}];

                let state = reducers.generations(initialState, {
                    type: 'EVOLVE_POPULATION', 
                    generationId: 2,
                    individuals: []
                });

                expect(state).toEqual([
                    ...initialState,
                    {
                        id: 2
                    }
                ]);
            })
        });

    });

    describe('samples', () => {

    });

    describe('operands', () => {

    });

    describe('singleOperators', () => {

    });

    describe('doubleOperators', () => {

    });

    describe('initialGenerationConfig', () => {
        
    });

});
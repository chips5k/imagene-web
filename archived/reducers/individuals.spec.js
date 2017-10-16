import individuals from '../../reducers/individuals';

describe('individuals', () => {
    
    it('should intialize to a default state', () => {
        expect(individuals(undefined, {})).toEqual({
            byId: {},
            allIds: []  
        });
    });
    
    describe('CREATE_INITIAL_GENERATION', () => {
        it('should clear all existing individuals', () => {
            let initialState = {
                byId: {
                    1: {},
                    2: {}
                },
                allIds: [1, 2]
            }
            expect(individuals(initialState, {
                type: 'CREATE_INITIAL_GENERATION',
                generationId: 1
            })).toEqual({
                byId: {},
                allIds: []  
            });
        });
    });

    describe('GENERATE_INDIVIDUALS', () => {
        it('should store the supplied individuals', () => {
            
            expect(individuals({}, {
                type: 'GENERATE_INDIVIDUALS',
                generationId: 1,
                individuals: [{id: 1, generationId: 1},{ id: 2, generationId: 1}, { id: 3, generationId: 1}]
            })).toEqual({
                byId: {
                    1: { id: 1, generationId: 1},
                    2: { id: 2, generationId: 1},
                    3: { id: 3, generationId: 1}
                },
                allIds: [1, 2, 3]  
            });
        });

        it('should clear existing individuals', () => {
            let initialState = {
                byId: {
                    6: {},
                    8: {}
                },
                allIds: [1, 2]
            }
            expect(individuals(initialState, {
                type: 'GENERATE_INDIVIDUALS',
                generationId: 1,
                individuals: [{id: 1, generationId: 1},{ id: 2, generationId: 1}, { id: 3, generationId: 1}]
            })).toEqual({
                byId: {
                    1: { id: 1, generationId: 1},
                    2: { id: 2, generationId: 1},
                    3: { id: 3, generationId: 1}
                },
                allIds: [1, 2, 3]  
            });
        })
    });

    describe('EVOLVE_INDIVIDUALS', () => {
        it('should contain the supplied individuals', () => {

            expect(individuals({byId: {}, allIds: []}, {
                type: 'EVOLVE_INDIVIDUALS',
                generationId: 2,
                individuals: [
                    {id: 1, generationId: 2, expression: ['x','px','-']},
                    {id: 2, generationId: 2, expression: ['rand', 'pi', '*']},
                    {id: 3, generationId: 2, expression: ['sin', 'cos', '12']}
                ]
            })).toEqual({
                byId: {
                    1: {id: 1, generationId: 2, expression: ['x','px','-']},
                    2: {id: 2, generationId: 2, expression: ['rand', 'pi', '*']},
                    3: {id: 3, generationId: 2, expression: ['sin', 'cos', '12']}
                },
                allIds: [1,2,3]
            });

        });

        it('should retain individuals with ids less than the smallest id supplied', () => {
            let initialState = {
                byId: {
                    1: { id: 1 },
                    2: { id: 2 },
                    3: { id: 3 },
                    4: { id: 4 }
                }, 
                allIds: [1, 2, 3, 4]
            }

            expect(individuals(initialState, {
                type: 'EVOLVE_INDIVIDUALS',
                generationId: 2,
                individuals: [
                    { id: 2 },
                    { id: 3 }
                ]
            })).toEqual({
                byId: {
                    1: { id: 1},
                    2: { id: 2},
                    3: { id: 3}
                },
                allIds: [1,2,3]
            });
        });

        it('should remove individuals with ids higher than the smallest id supplied', () => {
            let initialState = {
                byId: {
                    1: { id: 1 },
                    2: { id: 2 },
                    3: { id: 3 },
                    4: { id: 4 }
                }, 
                allIds: [1, 2, 3, 4]
            }

            expect(individuals(initialState, {
                type: 'EVOLVE_INDIVIDUALS',
                generationId: 2,
                individuals: [
                    { id: 1 },
                    { id: 3 }
                ]
            })).toEqual({
                byId: {
                    1: { id: 1},
                    3: { id: 3}
                },
                allIds: [1, 3]
            });
        });

        it('should not alter state if conflicting ids/generations found', () => {
            
            let initialState = {
                byId: {
                    1: { id: 1, generationId: 1 },
                    2: { id: 2, generationId: 1 },
                    3: { id: 3, generationId: 3 },
                    4: { id: 4, generationId: 4 }
                }, 
                allIds: [1, 2, 3, 4]
            }

            expect(individuals(initialState, {
                type: 'EVOLVE_INDIVIDUALS',
                generationId: 2,
                individuals: [
                    { id: 1, generationId: 2 },
                    { id: 3, generationId: 1 }
                ]
            })).toEqual({
                byId: {
                    1: { id: 1, generationId: 1 },
                    2: { id: 2, generationId: 1 },
                    3: { id: 3, generationId: 3 },
                    4: { id: 4, generationId: 4 }
                }, 
                allIds: [1, 2, 3, 4]
            });

        });
    });

    describe('INCREASE_SAMPLE_FITNESS', () => {
        it('should increase the fitness value of the RGB individuals by 1', () => {
            const initialState = {
                byId: {
                    1: { id: 1, fitness: 1},
                    2: { id: 2, fitness: 3},
                    3: { id: 3, fitness: 4},
                    4: { id: 4, fitness: 0}
                },
                allIds: [1, 2, 3, 4]
            };

            expect(individuals(initialState, {
                type: 'INCREASE_SAMPLE_FITNESS',
                sampleId: 3,
                redIndividualId: 1,
                greenIndividualId: 2,
                blueIndividualId: 4
            })).toEqual({
                byId: {
                   1: { id: 1, fitness: 2 },
                   2: { id: 2, fitness: 4 },
                   3: { id: 3, fitness: 4 },
                   4: { id: 4, fitness: 1}
                },
                allIds: [...initialState.allIds]
            });
        });
    });

    describe('DECREASE_SAMPLE_FITNESS', () => {
        it('should decrease the fitness value of the RGB individuals', () => {
            const initialState = {
                byId: {
                    1: { id: 1, fitness: 1},
                    2: { id: 2, fitness: 3},
                    3: { id: 3, fitness: 4},
                    4: { id: 4, fitness: 1}
                },
                allIds: [1, 2, 3, 4]
            };

            expect(individuals(initialState, {
                type: 'DECREASE_SAMPLE_FITNESS',
                sampleId: 3,
                redIndividualId: 1,
                greenIndividualId: 2,
                blueIndividualId: 4
            })).toEqual({
                byId: {
                   1: { id: 1, fitness: 0 },
                   2: { id: 2, fitness: 2 },
                   3: { id: 3, fitness: 4 },
                   4: { id: 4, fitness: 0}
                },
                allIds: [...initialState.allIds]
            });
        });

        it('should not allow fitness values to drop below zero', () => {
            const initialState = {
                byId: {
                    1: { id: 1, fitness: 0},
                    2: { id: 2, fitness: 0},
                    3: { id: 3, fitness: 0},
                    4: { id: 4, fitness: 0}
                },
                allIds: [1, 2, 3, 4]
            };

            expect(individuals(initialState, {
                type: 'DECREASE_SAMPLE_FITNESS',
                sampleId: 3,
                redIndividualId: 1,
                greenIndividualId: 2,
                blueIndividualId: 4
            })).toEqual({
                byId: {
                   1: { id: 1, fitness: 0 },
                   2: { id: 2, fitness: 0 },
                   3: { id: 3, fitness: 0 },
                   4: { id: 4, fitness: 0}
                },
                allIds: [...initialState.allIds]
            });
        })
    });
});
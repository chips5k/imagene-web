import * as reducers from '../../reducers/reducers';

describe('reducers', () => {

    describe('generations', () => {
        
        it('should initialize to an appropriate default state', () => {
            expect(reducers.generations(undefined, {})).toEqual({
                byId: {},
                allIds: []  
            });
        })

        describe('CREATE_INITIAL_GENERATION', () => {

            it('should only contain an empty generation with the supplied id', () => {
                let state = reducers.generations(undefined, {
                    type: 'CREATE_INITIAL_GENERATION',
                    generationId: 1
                });
    
                expect(state).toEqual({
                    byId: {
                        1: {
                            id: 1,
                            individuals: [],
                            samples: []
                        }
                    },
                    allIds: [1]
                });
            });

            it('should clear any existing generations', () => {
                let initialState = {
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        },
                        2: {
                            id: 2,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        }
                    },
                    allIds: [1,2]
                };
    
    
                let state = reducers.generations(initialState, {
                    type: 'CREATE_INITIAL_GENERATION',
                    generationId: 1
                });
    
                expect(state).toEqual({
                    byId: {
                        1: {
                            id: 1,
                            individuals: [],
                            samples: []
                        }
                    },
                    allIds: [1]
                });
            });

        });

        describe('GENERATE_INDIVIDUALS', () => {

            it('should contain a single generation with the individual ids of the supplied individuals', () => {
                let state = reducers.generations({byId: {}, allIds: []}, {
                    type: 'GENERATE_INDIVIDUALS',
                    generationId: 1,
                    individuals: [{ id: 1}, {id: 3}, {id: 6}]
                });
    
                expect(state).toEqual({
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 3, 6],
                            samples: []
                        }
                    },
                    allIds: [1]
                });
            });

            it('should clear any existing generations', () => {
                let initialState = {
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        },
                        2: {
                            id: 2,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        }
                    },
                    allIds: [1,2]
                };
    
    
                let state = reducers.generations(initialState, {
                    type: 'GENERATE_INDIVIDUALS',
                    generationId: 1,
                    individuals: [{id: 1}, {id: 2}, {id: 3}]
                });
    
                expect(state).toEqual({
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 2, 3],
                            samples: []
                        }
                    },
                    allIds: [1]
                });
            });
    
        });

        describe('EVOLVE_INDIVIDUALS', () => {
            it('contain a generation with the individual ids of the supplied individuals', () => {
               
                let state = reducers.generations(undefined, {
                    type: 'EVOLVE_INDIVIDUALS',
                    generationId: 3,
                    individuals: [{id: 5}, {id: 6}, {id: 7}]
                });
    
                expect(state).toEqual({
                    byId: {
                        3: {
                            id: 3,
                            individuals: [5, 6, 7],
                            samples: []
                        }
                    },
                    allIds: [3]
                });
    
            });

            it('should retain existing generations with an id lower than the supplied generation id', () => {

                let initialState = {
                    byId: {
                        1: { id: 1, individuals: [], samples: []},
                        2: { id: 2, individuals: [], samples: []}
                    },
                    allIds: [1, 2]
                };

                let state = reducers.generations(initialState, {
                    type: 'EVOLVE_INDIVIDUALS',
                    generationId: 3,
                    individuals: [{id: 5}, {id: 6}, {id: 7}]
                });
    
                expect(state).toEqual({
                    byId: {
                        ...initialState.byId,
                        3: {
                            id: 3,
                            individuals: [5, 6, 7],
                            samples: []
                        }
                    },
                    allIds: [...initialState.allIds, 3]
                });

            });

            it('should replace any existing generations with a corresponding id and remove anything ahead of the current generation', () => {
                let initialState = {
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        },
                        2: {
                            id: 2,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        },
                        3: {
                            id: 3,
                            individuals: [1, 2], 
                            samples: [1, 2, 3]
                        }
                    },
                    allIds: [1,2,3]
                };


                let state = reducers.generations(initialState, {
                    type: 'EVOLVE_INDIVIDUALS',
                    generationId: 2,
                    individuals: [{id: 5}, {id: 6}, {id: 7}]
                });

                expect(state).toEqual({
                    byId: {
                        1: {...initialState.byId[1]},
                        2: {
                            id: 2,
                            individuals: [5, 6, 7],
                            samples: []
                        }
                    }, 
                    allIds: [1, 2]
                });
            });

            it('should not alter state, if conflicting individual ids found', () => {

                let initialState = {
                    byId: {
                        1: {
                            id: 1,
                            individuals: [1, 2, 3],
                            samples: []
                        },
                        2: {
                            id: 2,
                            individuals: [4, 5, 6]
                        }
                    },
                    allIds: [1, 2]
                }

                expect(reducers.generations(initialState, {
                    type: 'EVOLVE_INDIVIDUALS', 
                    generationId: 3,
                    individuals: [2, 4, 6]
                })).toEqual(initialState);

            });
        });
    });

    describe('individuals', () => {

        it('should intialize to a default state', () => {
            expect(reducers.individuals(undefined, {})).toEqual({
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
                expect(reducers.individuals(initialState, {
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
                
                expect(reducers.individuals({}, {
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
                expect(reducers.individuals(initialState, {
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

                expect(reducers.individuals({byId: {}, allIds: []}, {
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

                expect(reducers.individuals(initialState, {
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

                expect(reducers.individuals(initialState, {
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

                expect(reducers.individuals(initialState, {
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

        });

        describe('DECREASE_SAMPLE_FITNESS', () => {

        });

    });

    describe('config', () => {

        it('should initialize to an appropriate default state', () => {
            expect(reducers.config(undefined, {})).toEqual({
                numberOfIndividuals: 0,
                minExpressionDepth: 0,
                maxExpressionDepth: 12
            });
        })

        describe('CREATE_INITIAL_GENERATION', () => {
            it('should set default values', () => {

                expect(reducers.config(undefined, {
                    type: 'CREATE_INITIAL_GENERATION'
                })).toEqual({
                    numberOfIndividuals: 24,
                    minExpressionDepth: 0,
                    maxExpressionDepth: 12
                });
            });
        });
        
        describe('GENERATE_INDIVIDUALS', () => {
            it('Should update to match supplied data', () => {
                expect(reducers.config({}, {
                    type: 'GENERATE_INDIVIDUALS', 
                    individuals: [0, 1, 2, 3],
                    minExpressionDepth: 6,
                    maxExpressionDepth: 8
                })).toEqual({
                    numberOfIndividuals: 4,
                    minExpressionDepth: 6,
                    maxExpressionDepth: 8
                });
            })
        });

    });

    describe('samples', () => {

        it('should intialize to a default state', () => {
            expect(reducers.samples(undefined, {})).toEqual({
                byId: {},
                allIds: []  
            });
        });

        describe('CREATE_INITIAL_GENERATION', () => {
            it('should clear existing data', () => {
                const initialState = {
                    byId: {
                        1: {},
                        2: {},
                        3: {}
                    },
                    allIds: [1, 2, 3]
                };

                expect(reducers.samples(initialState, {
                    type: 'CREATE_INITIAL_GENERATION'
                })).toEqual({
                    byId: {},
                    allIds: []
                });
            });
        });

        describe('GENERATE_INDIVIDUALS', () => {
            it('should clear existing data', () => {
                const initialState = {
                    byId: {
                        1: {},
                        2: {},
                        3: {}
                    },
                    allIds: [1, 2, 3]
                };

                expect(reducers.samples(initialState, {
                    type: 'GENERATE_INDIVIDUALS'
                })).toEqual({
                    byId: {},
                    allIds: []
                });
            });
        });
        
        describe('GENERATE_SAMPLE', () => {
            it('should store the supplied data if no existing ids found', () => {

            });

            it('should override the existing data if matching ids found', () => {

            });

        });

        describe('SAMPLE_DATA_GENERATING', () => {
            it('should update the specified sample with a pending/progress state', () => {

            });
        });

        describe('SAMPLE_DATA_GENERATED', () => {
            it('should update the specified sample by clearing the pending/progress state, and storing the supplied data', () => {

            });

            it('should contain a UInt8Clamped array', () => {

            });
        });

        describe('INCREASE_SAMPLE_FITNESS', () => {
            it('should increase the fitness value by 1 of the supplied sample', () => {

            });
        });

        describe('DECREASE_SAMPLE_FITNESS', () => {
            it('should decrease the fitness value by 1 of the supplied sample', () => {
                
            });
        });

    });

    describe('operands', () => {

    });

    describe('singleOperators', () => {

    });

    describe('doubleOperators', () => {

    });
});
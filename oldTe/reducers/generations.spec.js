import generations from '../../reducers/generations';

describe('generations', () => {
    
    it('should initialize to an appropriate default state', () => {
        expect(generations(undefined, {})).toEqual({
            byId: {},
            allIds: []  
        });
    })

    describe('CREATE_INITIAL_GENERATION', () => {

        it('should only contain an empty generation with the supplied id', () => {
            let state = generations(undefined, {
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


            let state = generations(initialState, {
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
            let state = generations({byId: {}, allIds: []}, {
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


            let state = generations(initialState, {
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
           
            let state = generations(undefined, {
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

            let state = generations(initialState, {
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


            let state = generations(initialState, {
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

            expect(generations(initialState, {
                type: 'EVOLVE_INDIVIDUALS', 
                generationId: 3,
                individuals: [2, 4, 6]
            })).toEqual(initialState);

        });
    });

    describe('GENERATE_SAMPLES', () => {

        it('should contain the supplied sample ids', () => {
            let initialState = {
                byId: {
                    1: {
                        id: 1, 
                        samples: []
                    }
                },
                allIds: [1]
            }

            expect(generations(initialState, {
                type: 'GENERATE_SAMPLES',
                generationId: 1,
                samples: [{
                    id: 1
                }]
            })).toEqual({
                byId: {
                    1: {
                        id: 1,
                        samples: [1]
                    }
                },
                allIds: [1]
            });
        });

        it('should retain previous sample ids', () => {
            let initialState = {
                byId: {
                    1: {
                        id: 1, 
                        samples: [1]
                    }
                },
                allIds: [1]
            }

            expect(generations(initialState, {
                type: 'GENERATE_SAMPLES',
                generationId: 1,
                samples: [{
                    id: 2
                }]
            })).toEqual({
                byId: {
                    1: {
                        id: 1,
                        samples: [1, 2]
                    }
                },
                allIds: [1]
            });
        });


    });
});
import samples from '../../reducers/samples';

describe('samples', () => {
    
    it('should intialize to a default state', () => {
        expect(samples(undefined, {})).toEqual({
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

            expect(samples(initialState, {
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

            expect(samples(initialState, {
                type: 'GENERATE_INDIVIDUALS'
            })).toEqual({
                byId: {},
                allIds: []
            });
        });
    });
    
    describe('GENERATE_SAMPLES', () => {
        it('should store the supplied data if no existing ids found', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: {}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'GENERATE_SAMPLES',
                samples: [{
                    id: 4
                }, {
                    id: 5
                }]
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    4: { id: 4},
                    5: { id: 5}
                },
                allIds: [...initialState.allIds, 4, 5]
            });
        });

        it('should override the existing data if matching ids found', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: { id: 3, test: 'not-blah'}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'GENERATE_SAMPLES',
                samples: [{
                    id: 3,
                    test: 'blah'
                }]
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    3: { id: 3, test: 'blah'}
                },
                allIds: [...initialState.allIds]
            });
        });
    });

    describe('SAMPLE_DATA_GENERATING', () => {
        it('should update the specified sample with a pending/progress state', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: { id: 3, processing: false}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'SAMPLE_DATA_GENERATING',
                sampleId: 3
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    3: {
                        ...initialState.byId[3],
                        processing: true
                    }
                },
                allIds: [...initialState.allIds]
            });
        });
    });

    describe('SAMPLE_DATA_GENERATED', () => {
        it('should update the specified sample by clearing the pending/progress state, and storing the supplied data as a UInt8Clamped Array', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: { id: 3, processing: false, cache: {}}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'SAMPLE_DATA_GENERATED',
                sampleId: 3,
                coordinateType: 'cartesian',
                data: [1, 2, 3]
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    3: {
                        ...initialState.byId[3],
                        processing: false,
                        cache: {
                            cartesian: Uint8ClampedArray.from([1, 2, 3])
                        }
                    }
                },
                allIds: [...initialState.allIds]
            });
        });
    });

    describe('INCREASE_SAMPLE_FITNESS', () => {
        it('should increase the fitness value by 1 of the supplied sample', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: { id: 3, processing: false, fitness: 0}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'INCREASE_SAMPLE_FITNESS',
                sampleId: 3
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    3: {
                        ...initialState.byId[3],
                        fitness: 1
                    }
                },
                allIds: [...initialState.allIds]
            });
        });
    });

    describe('DECREASE_SAMPLE_FITNESS', () => {
        it('should decrease the fitness value by 1 of the supplied sample', () => {
            const initialState = {
                byId: {
                    1: {},
                    2: {},
                    3: { id: 3, processing: false, fitness: 5}
                },
                allIds: [1, 2, 3]
            };

            expect(samples(initialState, {
                type: 'DECREASE_SAMPLE_FITNESS',
                sampleId: 3
            })).toEqual({
                byId: {
                    ...initialState.byId,
                    3: {
                        ...initialState.byId[3],
                        fitness: 4
                    }
                },
                allIds: [...initialState.allIds]
            });
        });

        
    });

});
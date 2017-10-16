import { evolveIndividuals, selectEvolutionMethod } from '../../lib/individuals';

describe('individuals',
() => {

    describe('selectEvolutionMethod', () => {

        it('should call the fitness selector with the supplied weighted data', () => {

            const selector = jest.fn((methods) => 1); 

            let method = selectEvolutionMethod(selector, 0, 1, 2);

            expect(selector).toHaveBeenCalledWith([
                {
                    name: 'elitism',
                    fitness: 0
                },
                {
                    name: 'crossover',
                    fitness: 1
                },
                {
                    name: 'mutation',
                    fitness: 2
                }
            ]);
        });

        it('should return the method name', () => {
           expect(selectEvolutionMethod((methods) => 2), 0, 1, 2, ).toEqual('mutation');
        });

    });

    describe('evolveIndividuals', () => {

        it('should retain individuals when elitism is selected', () => {
            const noop = () => {};
            const individuals = [
                {
                    id: 1,
                }, 
                {
                    id: 2
                },
                {
                    id: 3
                }
            ];

            expect(
                evolveIndividuals(
                    noop, 
                    () => 'elitism', 
                    () => 0, 
                    noop, 
                    noop,
                    individuals
                )
            ).toEqual(individuals);

        });

        it('should call the breeder function when crossover is selected', () => {

            const noop = () => {};
            const individuals = [
                {
                    id: 1,
                    expression: ['a']
                }, 
                {
                    id: 2,
                    expression: ['b']
                },
                {
                    id: 3,
                    expression: ['c']
                }
            ];

            const breeder = (individualA, individualB) => {
                return { expression: [...individualA.expression, ...individualB.expression] }
            };

            let calls = 0;

            expect(
                evolveIndividuals(
                    noop, 
                    () => 'crossover', 
                    () => {
                        let i = calls++;
                        if(calls >= 3) { calls = 0;}
                        return i;
                    }, 
                    noop, 
                    breeder,
                    individuals
                )
            ).toEqual([
                {
                    expression: ['a', 'b']
                },
                {
                    expression: ['c', 'a']
                },
                {
                    expression: ['b', 'c']
                }
            ]);
        });

        it('should call the mutator function when mutation is selected', () => {
            
            const noop = () => {};
            const individuals = [
                {
                    id: 1,
                    expression: [1]
                }, 
                {
                    id: 2,
                    expression: [2]
                },
                {
                    id: 3,
                    expression: [3]
                }
            ];

            const mutator = (individualA) => {
                return {...individualA, expression: individualA.expression.map(n => -n)}
            };

            let calls = 0;

            expect(
                evolveIndividuals(
                    noop, 
                    () => 'mutation', 
                    () => {
                        return 0;
                    }, 
                    mutator, 
                    noop,
                    individuals
                )
            ).toEqual([
                {
                    id: 1,
                    expression: [-1]
                },
                {
                    id: 2,
                    expression: [-2]
                },
                {
                    id: 3,
                    expression: [-3]
                }
            ]);
        });
    });
});
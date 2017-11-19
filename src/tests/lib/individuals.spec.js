import { evolveIndividuals, selectEvolutionMethod, crossOverIndividuals, mutateIndividual } from '../../lib/individuals';

describe('individuals', () => {

    describe('selectEvolutionMethod', () => {
        it('should work', () => {
            const crossOverIndividuals = jest.fn();
            const mutateIndividual = jest.fn();
            const selectByWeight = jest.fn(() => {
                return 1;
            });

            expect(selectEvolutionMethod(() => 0, crossOverIndividuals, mutateIndividual, 0.5, 0.5)).toEqual(crossOverIndividuals);
            expect(selectEvolutionMethod(() => 1, crossOverIndividuals, mutateIndividual, 0.5, 0.5)).toEqual(mutateIndividual);

            selectEvolutionMethod(selectByWeight, crossOverIndividuals, mutateIndividual, 0.5, 1);
            expect(selectByWeight).toHaveBeenCalledWith([0.5, 1]);
        });
    });

    describe('evolveIndividuals', () => {
        it('should work', () => {
            const selectTruncate = jest.fn((n, p) => [0, 1]);
            const initial = [
                {
                    fitness: 0.5
                }, 
                {
                    fitness: 0.6
                },
                {
                    fitness: 0
                },
                {
                    fitness: 0
                }
            ];
            const fakeEvolutionMethod = jest.fn(n => {
                return n;
            });

            
            const selectEvolutionMethod = jest.fn((c, m) => {
              return fakeEvolutionMethod;  
            });

            expect(
                evolveIndividuals(
                    selectTruncate, 
                    selectEvolutionMethod, 
                    initial
                )
            ).toEqual(
                [
                    {
                        fitness: 0.5
                    }, 
                    {
                        fitness: 0.6
                    }
                ]
            );

            expect(selectTruncate).toHaveBeenCalledWith([0.5, 0.6, 0, 0], 0.5);
            expect(selectEvolutionMethod).toHaveBeenCalledTimes(16);
            expect(fakeEvolutionMethod).toHaveBeenCalledTimes(16);
            expect(fakeEvolutionMethod).toHaveBeenCalledWith([{ fitness: 0.5}, {fitness: 0.6}]);
            
            const alternateSelectEvolutionMethod = jest.fn((c, m) => {
                return (n) => {
                    return [...n, n[1]]
                }    
            });

            expect(
                evolveIndividuals(
                    selectTruncate, 
                    alternateSelectEvolutionMethod,  
                    initial
                )
            ).toEqual(
                [
                    {
                        fitness: 0.5
                    }, 
                    {
                        fitness: 0.6
                    },
                    {
                        fitness: 0.6
                    },
                    {
                        fitness: 0.6
                    },
                ]
            );

            expect(alternateSelectEvolutionMethod).toHaveBeenCalledTimes(2);
        });
        
    });

    describe('crossOverIndividuals', () => {
        it('should work', () => {

            const selectParentAIndex = jest.fn((n) => 0);
            const selectParentBIndex = jest.fn((n) => 1);
            const selectNumChildren = jest.fn((n) => 2);
            const crossOverExpression = jest.fn((n) => ['1', '+', '2', '+', '2']);

            const individuals = [
                {
                    fitness: 1,
                    expression: ['1', '+', '2']
                },
                {
                    fitness: 2,
                    expression: ['1', '+', '2']
                }
            ];

            expect(crossOverIndividuals(crossOverExpression, selectParentAIndex, selectParentBIndex, selectNumChildren, individuals)).toEqual([
                ...individuals,
                {
                    fitness: Math.floor((1 + 2) / 2),
                    expression: ['1', '+', '2', '+', '2']
                },
                {
                    fitness: Math.floor((1 + 2) / 2),
                    expression: ['1', '+', '2', '+', '2']
                }
            ]);
        });
    })

    describe('mutateIndividual', () => {
        it('should work', () => {

            const mutateExpression = jest.fn((n) => [...n, '-', 'a']);
            const selectIndividualIndex = jest.fn(() => 1);

            const individuals = [
                {
                    fitness: 1,
                    expression: ['1', '+', '2']
                },
                {
                    fitness: 2,
                    expression: ['1', '+', '2']
                }
            ];

            expect(mutateIndividual(mutateExpression, selectIndividualIndex, individuals)).toEqual([
                {
                    fitness: 1,
                    expression: ['1', '+', '2']
                },
                {
                    fitness: 2,
                    expression: ['1', '+', '2', '-', 'a']
                } 
            ]);
        });
    });
});
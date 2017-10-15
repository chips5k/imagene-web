import config from '../../reducers/config';

describe('config', () => {
    
    it('should initialize to an appropriate default state', () => {
        expect(config(undefined, {})).toEqual({
            numberOfIndividuals: 0,
            minExpressionDepth: 0,
            maxExpressionDepth: 0
        });
    })

    describe('CREATE_INITIAL_GENERATION', () => {
        it('should set default values', () => {

            expect(config(undefined, {
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
            expect(config({}, {
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
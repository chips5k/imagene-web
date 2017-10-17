import { 
    tokenCreators,
    tokenEvaluators,
    buildExpression,
    solveExpression,
    getToken,
    OPERAND,
    OPERATOR_DOUBLE,
    OPERATOR_SINGLE,
    crossOverExpressions,
    mutateExpression,
    expressionToTree,
    treeToString
} from '../../lib/expressions';

//Other dependencies
import Random from 'random-js';

describe('expressions', () => {
    
    
    describe('tokenCreators', () => {

        it('should contain operands', () => {
            expect(tokenCreators.hasOwnProperty('operands')).toBe(true);
        });

        it('should contain singleOperators', () => {
            expect(tokenCreators.hasOwnProperty('singleOperators')).toBe(true);
        });

        it('should contain doubleOperators', () => {
            expect(tokenCreators.hasOwnProperty('doubleOperators')).toBe(true);
        });
        
        it('should only contain functions that return simple arrays containing one or more string or number tokens', () => {
            const getRandomReal = () => { return 10};

            for(let i in tokenCreators) {
                for(let j in tokenCreators[i]) {
                    expect(Array.isArray(tokenCreators[i][j](getRandomReal))).toBe(true);
                    tokenCreators[i][j](getRandomReal).forEach(n => {
                        expect(['string', 'number'].indexOf(typeof n)).not.toBe(-1);
                    });
                }
            }
        });

        it('should only generate evaluable tokens', () => {
            const getRandomReal = () => { return 10};

            for(let i in tokenCreators) {
                for(let j in tokenCreators[i]) {

                    let tokens = tokenCreators[i][j](getRandomReal);
                    tokens.forEach(n => {
                        if(typeof n !== 'number') {
                            let evaluator = tokenEvaluators.singleOperators[n] || tokenEvaluators.doubleOperators[n] || tokenEvaluators.operands[n];
                            expect(typeof evaluator).toBe('function');
                        }
                    });
                }
            }
        });
    });

    describe('tokenEvaluators', () => {
        it('should contain operands', () => {
            expect(tokenEvaluators.hasOwnProperty('operands')).toBe(true);
        });

        it('should contain singleOperators', () => {
            expect(tokenEvaluators.hasOwnProperty('singleOperators')).toBe(true);
        });

        it('should contain doubleOperators', () => {
            expect(tokenEvaluators.hasOwnProperty('doubleOperators')).toBe(true);
        });
        
        it('should only contain functions that return numeric results', () => {
            for(let i in tokenEvaluators) {
                for(let j in tokenEvaluators[i]) {
                    expect(typeof tokenEvaluators[i][j]).toBe('function');
                    expect(typeof tokenEvaluators[i][j](100, 100)).toBe('number');
                }
            }
        });
    });

    describe('getToken', () => {
        
        it('should select a token from the supplied set, using the supplied algorithm and type', () => {
            const getRandomReal = () => { return 10};

            let operandKeys = Object.keys(tokenCreators.operands);
            let expectedToken = tokenCreators.operands['pX'](getRandomReal);

            let token = getToken(tokenCreators, getRandomReal, () => 0, OPERAND);
            expect(token).toEqual(expectedToken);


            let doubleOperatorKeys = Object.keys(tokenCreators.doubleOperators);
            expectedToken = tokenCreators.doubleOperators['+']();
            token = getToken(tokenCreators, getRandomReal, () => 0, OPERATOR_DOUBLE);
            expect(token).toEqual(expectedToken);


            let singleOperatorKeys = Object.keys(tokenCreators.singleOperators);
            expectedToken = tokenCreators.singleOperators['sin']();
            token = getToken(tokenCreators, getRandomReal, () => 3, OPERATOR_SINGLE);
            expect(token).toEqual(expectedToken);
        });
    });

    describe('buildExpression', () => {

        it('should build valid rpn expressions from the supplied data', () => {
            const getRandomReal = () => { return 10};
            
            const partiallyAppliedGetToken = getToken.bind(null, tokenCreators, getRandomReal, () => 0);
            const expression = buildExpression(partiallyAppliedGetToken, () => 1, 0, 1, 0);
            const expectedExpression = ['pX', 'pX', '+', 'pX', 'pX', '+', '+'];

            expect(expression).toEqual(expectedExpression);
        });
    });

    describe('solveExpression', () => {

        it('should solve expressions', () => {

            expect(solveExpression(tokenEvaluators, ['10', '12', '+'], 0, 0)).toEqual(22);

        });

    });

    describe('crossOverExpressions', () => {

        it('should combine two expressions and produce  an evaluatable result', () => {

            //Initialite our random engine
            // const random = new Random(Random.engines.mt19937().autoSeed());

            // const getRandomInteger = (min, max) => {
            //     return random.integer(min, max);
            // }
            
            // const result = crossOverExpressions(tokenEvaluators, getRandomInteger, ['a', 'b', '+', 'tan'], ['d', 'sin']);
            // console.log(result);  
        });
    });

    describe('expressionToTree', () => {

        it('should convert expressions to binary trees', () => {

            let tree = expressionToTree(tokenEvaluators, ['pX', 'pY', '+', '23', 'sqrt', '*', 'tan', 'PI', 'pY', '*', '/']);
            
            expect(tree).toEqual({ 
                root: '/',
                a: { 
                    root: 'tan',
                    a:{ 
                        root: '*',
                        a: { root: '+', a: 'pX', b: 'pY' },
                        b: { root: 'sqrt', a: '23' }
                    } 
                },
                b: { root: '*', a: 'PI', b: 'pY' }
            });

        });

    });

    describe('treeToExpression', () => {
        
        it('should convert trees to rpn expressions', () => {

            let expression = treeToExpression(tokenEvaluators, { 
                root: '/',
                a: { 
                    root: 'tan',
                    a:{ 
                        root: '*',
                        a: { root: '+', a: 'pX', b: 'pY' },
                        b: { root: 'sqrt', a: '23' }
                    } 
                },
                b: { root: '*', a: 'PI', b: 'pY' }
            });

            expect(expression).toEqual(['pX', 'pY', '+', '23', 'sqrt', '*', 'tan', 'PI', 'pY', '*', '/']);

        });

    });
});
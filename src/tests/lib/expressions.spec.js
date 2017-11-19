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
    treeToExpression,
    findBinaryTreeNodeByIndex,
    treeToString,
    convertExpressionToWeightedArray
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
            token = getToken(tokenCreators, getRandomReal, () => 1, OPERATOR_SINGLE);
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

            const result = crossOverExpressions(tokenEvaluators, () => 1, () => 3, [12, 'a', '-'], ['a', 'b', '+', 'tan']);
            
            expect(result).toEqual(['a', 12, '+', 'tan']);

        });
    });

    describe('convertExpressionToWeightedArray', () => {
        //expect(convertExpressionToWeightedArray(tokenEvaluators, ['1', '2', '+', '4', '*'])).toEqual([2, 2, 0.2, 1, 0]);

        expect(convertExpressionToWeightedArray(tokenEvaluators, ['6', '3', '+', '4', '5', '*', '-', '4', '4', '+', '/'])).toEqual([4, 4, 3, 4, 4, 3, 2, 3, 3, 2, 1]);

        // convertExpressionToWeightedArray(tokenEvaluators, ['pY', '844.7345152710532', '*' ,'pY', 'tan' ,'^' ,'log']);
        
        // let e = ['pY',
        // '-2913.151174002098',
        // '*',
        // 'pX',
        // 'sin',
        // '%',
        // 'log',
        // 'pY',
        // '9719.692761477327',
        // '*',
        // 'pX',
        // 'tan',
        // '*',
        // 'pX',
        // 'pY',
        // 'CIR',
        // 'sqrt',
        // 'CIR',
        // '/',
        // 'sin',
        // 'PI',
        // 'sin',
        // '-2259.5849711471283',
        // 'tan',
        // '^',
        // '/'];

        // let w = convertExpressionToWeightedArray(tokenEvaluators, e);

        
        
    });

    describe('mutateExpression', () => {
        
        let mutated = mutateExpression(tokenEvaluators, () => 0,  (expression) => 1, () => 'a', () => ['a', 'b', 'c', '-', '+'], ['1', '+', '2', '*', '3']);

        expect(mutated).toEqual(['1', 'a', '2', '*', '3']);

    });


    describe('expressionToTree', () => {

        it('should convert expressions to binary trees', () => {

            let tree = expressionToTree(tokenEvaluators, ['pX', 'pY', '+', '23', 'sqrt', '*', 'tan', 'PI', 'pY', '*', '/']);
            
            expect(tree).toEqual({ 
                value: '/',
                a: { 
                    value: 'tan',
                    a:{ 
                        value: '*',
                        a: { value: '+', a: 'pX', b: 'pY' },
                        b: { value: 'sqrt', a: '23' }
                    } 
                },
                b: { value: '*', a: 'PI', b: 'pY' }
            });

        });

    });

    describe('findBinaryTreeNodeByIndex', () => {
        it('should find the node at the specified index', () => {

            const node = findBinaryTreeNodeByIndex(
                { 
                    value: '/',
                    a: { 
                        value: 'tan',
                        a:{ 
                            value: '*',
                            a: { value: '+', a: 'pX', b: 'pY' },
                            b: { value: 'sqrt', a: '23' }
                        } 
                    },
                    b: { value: '*', a: 'PI', b: 'pY' }
                }, 
                { value: 0 }, 3);

            expect(node).toEqual({value: '+', a: 'pX', b: 'pY' });

        });
    });

    describe('treeToExpression', () => {
        
        it('should convert trees to rpn expressions', () => {

            let expression = treeToExpression({ 
                value: '/',
                a: { 
                    value: 'tan',
                    a:{ 
                        value: '*',
                        a: { value: '+', a: 'pX', b: 'pY' },
                        b: { value: 'sqrt', a: '23' }
                    } 
                },
                b: { value: '*', a: 'PI', b: 'pY' }
            });

            expect(expression).toEqual(['pX', 'pY', '+', '23', 'sqrt', '*', 'tan', 'PI', 'pY', '*', '/']);
        });

    });
});
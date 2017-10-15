import createExpressionLibrary,  { OPERAND, OPERATOR_DOUBLE, OPERATOR_SINGLE } from '../../lib/expressions';
describe('expressions', () => {
    it('should be a functor', () => {
        expect(typeof createExpressionLibrary).toBe('function');
    });

    
    describe('tokenCreators', () => {
        let expressions = createExpressionLibrary(() => { return 1.00; }, () => { return 1 }, () => {}, () => {});
        
        it('should exist', () => {
            expect(expressions.hasOwnProperty('tokenCreators')).toBe(true);
        });

        it('should contain operands', () => {
            expect(expressions.tokenCreators.hasOwnProperty('operands')).toBe(true);
        });

        it('should contain singleOperators', () => {
            expect(expressions.tokenCreators.hasOwnProperty('singleOperators')).toBe(true);
        });

        it('should contain doubleOperators', () => {
            expect(expressions.tokenCreators.hasOwnProperty('doubleOperators')).toBe(true);
        });
        
        it('should only contain functions that return simple arrays containing one or more string or number tokens', () => {
            for(let i in expressions.tokenCreators) {
                for(let j in expressions.tokenCreators[i]) {
                    expect(Array.isArray(expressions.tokenCreators[i][j]())).toBe(true);
                    expressions.tokenCreators[i][j]().forEach(n => {
                        expect(['string', 'number'].indexOf(typeof n)).not.toBe(-1);
                    });
                }
            }
        });

        it('should only generate evaluable tokens', () => {
            for(let i in expressions.tokenCreators) {
                for(let j in expressions.tokenCreators[i]) {

                    let tokens = expressions.tokenCreators[i][j]();
                    tokens.forEach(n => {
                        if(typeof n !== 'number') {
                            let evaluator = expressions.tokenEvaluators.singleOperators[n] || expressions.tokenEvaluators.doubleOperators[n] || expressions.tokenEvaluators.operands[n];
                            if(!evaluator) {
                                console.log(n);
                            }
                            expect(typeof evaluator).toBe('function');
                        }
                    });
                }
            }
        });
    });

    describe('tokenEvaluators', () => {
        let expressions = createExpressionLibrary(() => { return 1.00; }, () => { return 1 }, () => {}, () => {});
        
        it('should exist', () => {
            expect(expressions.hasOwnProperty('tokenEvaluators')).toBe(true);
        });

        it('should contain operands', () => {
            expect(expressions.tokenEvaluators.hasOwnProperty('operands')).toBe(true);
        });

        it('should contain singleOperators', () => {
            expect(expressions.tokenEvaluators.hasOwnProperty('singleOperators')).toBe(true);
        });

        it('should contain doubleOperators', () => {
            expect(expressions.tokenEvaluators.hasOwnProperty('doubleOperators')).toBe(true);
        });
        
        it('should only contain functions that return numeric results', () => {
            for(let i in expressions.tokenEvaluators) {
                for(let j in expressions.tokenEvaluators[i]) {
                    expect(typeof expressions.tokenEvaluators[i][j]).toBe('function');
                    expect(typeof expressions.tokenEvaluators[i][j]({a: 100, b: 100, x: 1, y: 1})).toBe('number');
                }
            }
        });
    });

    describe('getToken', () => {
        let expressions = createExpressionLibrary(() => { return 1.00; }, () => { return 1 }, () => {}, () => {});

        it('should select a token from the supplied set, using the supplied algorithm and type', () => {
            let operandKeys = Object.keys(expressions.tokenCreators.operands);
            let expectedToken = expressions.tokenCreators.operands['pX']();
            let token = expressions.getToken(expressions.tokenCreators, () => 'pX', OPERAND);
            expect(token).toEqual(expectedToken);


            let doubleOperatorKeys = Object.keys(expressions.tokenCreators.doubleOperators);
            expectedToken = expressions.tokenCreators.doubleOperators['+']();
            token = expressions.getToken(expressions.tokenCreators, () => '+', OPERATOR_DOUBLE);
            expect(token).toEqual(expectedToken);


            let singleOperatorKeys = Object.keys(expressions.tokenCreators.singleOperators);
            expectedToken = expressions.tokenCreators.singleOperators['sin']();
            token = expressions.getToken(expressions.tokenCreators, () => 'sin', OPERATOR_SINGLE);
            expect(token).toEqual(expectedToken);
        });
    });

    describe('buildExpression', () => {

        it('should build valid rpn expressions from the supplied data', () => {
            const expressions = createExpressionLibrary(() => { return 1.00; }, () => { return 1}, () => {}, () => {});

            let getRandomIntegerCalls = 0;
            const getRandomInteger = (min, max) => {
                return min
            };

            let getTokenCalls = 0;

            const getToken = (tokenCreators, select, type) => {
                getTokenCalls++;
                switch(type) {
                    case OPERAND:
                        return tokenCreators.operands['pX']();
                    case OPERATOR_DOUBLE:
                        return tokenCreators.doubleOperators['+']();
                    case OPERATOR_SINGLE:
                        return tokenCreators.singleOperators['sin']();
                }
            };

            const expression = expressions.buildExpression(getToken.bind(null, expressions.tokenCreators, () => {}), getRandomInteger, 0, 1, 0);
            const expectedExpression = ['pX', 'pX', '+', 'pX', 'pX', '+', '+'];

            expect(expression).toEqual(expectedExpression);
        });
    });
});
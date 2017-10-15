
export const OPERATOR_DOUBLE = 'doubleOperators';
export const OPERATOR_SINGLE = 'singleOperators';
export const OPERAND = 'operands';

export default (getRandomInteger, getRandomReal) => {
    
    const tokenEvaluators =  {
            doubleOperators: {
                '+': ({a, b}) => a + b,
                '-': ({a, b}) => a - b,
                '/': ({a, b}) => a / b,
                '*': ({a, b}) => a * b, 
                '^': ({a, b}) => Math.pow(a, b),
                '%': ({a, b}) => a % b,
                'CIR': ({a, b}) => Math.sin(Math.sqrt(a * a + b * b) * Math.PI / 180.00)
            },
            singleOperators: {
                'sqrt': ({a}) => Math.sqrt(Math.abs(a)),
                'double': ({a}) => Math.pow(a, 2),
                'triple': ({a}) => Math.pow(a, 3),
                'sin': ({a}) => Math.sin(a % 3.16),
                'cos': ({a}) => Math.cos(a % 3.16),
                'tan': ({a}) => Math.tan(a),
                'log': ({a}) => Math.log(Math.abs(a))
            },
            operands: {
                'pX': ({x}) => x,
                'pY': ({y}) => y,
                'PI': () => Math.PI,
            }
    };

    const tokenCreators = {
        doubleOperators: {
            '+': () => ['+'],
            '-': () => ['-'],
            '/': () => ['/'],
            '*': () => ['*'], 
            '^': () => ['^'],
            '%': () => ['%'],
            'CIR': () => ['CIR']
        },
        singleOperators: {
            'sqrt': ()=> ['sqrt'],
            'double': ()=> ['double'],
            'triple': ()=> ['triple'],
            'sin': ()=> ['sin'],
            'cos': ()=> ['cos'],
            'tan': ()=> ['tan'],
            'log': ()=> ['log']
        },
        operands: {
            'pX': (x, y) => ['pX'],
            'pY': (x, y) => ['pY'],
            'PI': (x, y) => ['PI'],
            'PIx': (x, y) => ['PI', 'pX', '*'],
            'PIy': (x, y) => ['PI', 'pY','*'],
            'cosY': (x, y) => ['pY', 'cos'],
            'cosX': (x, y) => ['pX', 'cos'],
            'sinY': (x, y) => ['pY', 'sin'],
            'sinX': (x, y) => ['pX', 'sin'],
            'rand': (x, y) => [getRandomReal(0, 255)],
            'randX': (x, y) => [getRandomReal(0, 255), 'pX', '*'],
            'randy': (x, y) => [getRandomReal(0, 255), 'pY', '*'],
            'CIR': (x, y) => ['pX', 'pY', 'CIR']
        }
    };

    const getToken = (tokenCreators, select, type) => {
        
        let keys = Object.keys(tokenCreators[type]);
        let item = select(keys);
        return tokenCreators[type][item]();
    };
    
    const buildExpression = (getToken, getRandomInteger, minSubexpressions, maxSubexpressions, currentDepth = 0) => {
        let expression = [];


        //Todo randomize whether or not to nest
        
        let type = getRandomInteger(1, 2);
        if(type === 1) {
            
            if(currentDepth < maxSubexpressions) {
                let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
                expression = expression.concat(buildExpression(getToken, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
                expression = expression.concat(buildExpression(getToken, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
                expression = expression.concat(getToken(OPERATOR_DOUBLE));
            } else {
                expression = expression.concat(getToken(OPERAND));
                expression = expression.concat(getToken(OPERAND));
                expression = expression.concat(getToken(OPERATOR_DOUBLE));
            }
        } else {
            if(currentDepth < maxSubexpressions) {
                let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
                expression = expression.concat(buildExpression(getToken, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
                
            } else {
                expression = expression.concat(getToken(OPERAND));
            }
            expression = expression.concat(getToken(OPERATOR_SINGLE));
        }
        
        return expression;
    }

    const solveExpression = (tokenEvaluators, expression, args) => {
        let operandStack = [];
        let operatorStack = [];

        while(expression.length) {
            let n = expression.shift();
            
            if(!isNaN(parseFloat(n))) {
                operandStack.push(parseFloat(n));
            } else {
                if(tokenEvaluators.doubleOperators.hasOwnProperty(n)) {
                    operatorStack.push(tokenEvaluators.doubleOperators[n]);
                } else if(tokenEvaluators.singleOperators.hasOwnProperty(n)) {
                    operatorStack.push(tokenEvaluators.singleOperators[n]);
                } else if(tokenEvaluators.operands.hasOwnProperty(n)) {
                    let r = tokenEvaluators.operands[n](args);
                    if(isNaN(r) || !isFinite(r)) {
                        r = Object.values(args).reduce((a, n) => {
                            if(!isNaN(parseFloat(n))) {
                                return Math.max(a, n);
                            }
                            return a;
                        });
                    }
                    operandStack.push(r);
                }
            }
        
            if(operandStack.length > 0 && operatorStack.length > 0) {
                let f = operatorStack.pop();
                let r, a, b;
                if(f.length === 1) {
                    a = operandStack.pop();
                    r = f({a});

                    if(isNaN(r) || !isFinite(r)) {
                        r = Object.values(args).reduce((a, n) => {
                            if(!isNaN(parseFloat(n))) {
                                return Math.max(a, n);
                            }
                            return a;
                        });
                    }
                    operandStack.push(r);

                } else if(operandStack.length > 1) {
                    a = operandStack.pop();
                    b = operandStack.pop();
                    r = f({b, a});

                    if(isNaN(r) || !isFinite(r)) {
                        r = Object.values(args).reduce((a, n) => {
                            if(!isNaN(parseFloat(n))) {
                                return Math.max(a, n);
                            }
                            return a;
                        });
                    }
                    operandStack.push(r);

                } else {
                    //No solution return operator
                    operatorStack.push(f);
                }
            }
        }
        
        if(operandStack.length === 1 && operatorStack.length === 0) {
            return operandStack.pop();
        }
        
        throw new Error('Unable to solve expression: operands: ' + operandStack + ' operators: ' + operatorStack);
    };

    const mutateExpression = (tokenSelector, expression) => {

    };
    
    const crossOverExpressions = (expressionA, expressionB)  => {

    }

    return {
        tokenEvaluators,
        tokenCreators,
        getToken,
        buildExpression,
        solveExpression,
        mutateExpression,
        crossOverExpressions
    }
}


export const OPERATOR_DOUBLE = 'doubleOperators';
export const OPERATOR_SINGLE = 'singleOperators';
export const OPERAND = 'operands';

export const tokenEvaluators =  {
        doubleOperators: {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '/': (a, b) => a / b,
            '*': (a, b) => a * b, 
            '^': (a, b) => Math.pow(a, b),
            '%': (a, b) => a % b,
            'CIR': (a, b) => Math.sin(Math.sqrt(a * a + b * b) * Math.PI / 180.00)
        },
        singleOperators: {
            'sqrt': (a) => Math.sqrt(Math.abs(a)),
            'double': (a) => Math.pow(a, 2),
            'triple': (a) => Math.pow(a, 3),
            'sin': (a) => Math.sin(a % 3.16),
            'cos': (a) => Math.cos(a % 3.16),
            'tan': (a) => Math.tan(a),
            'log': (a) => Math.log(Math.abs(a))
        },
        operands: {
            'pX': (x, y) => x,
            'pY': (x, y) => y,
            'PI': () => Math.PI,
        }
};

export const tokenCreators = {
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
        'pX': () => ['pX'],
        'pY': () => ['pY'],
        'PI': () => ['PI'],
        'PIx': () => ['PI', 'pX', '*'],
        'PIy': () => ['PI', 'pY','*'],
        'cosY': () => ['pY', 'cos'],
        'cosX': () => ['pX', 'cos'],
        'sinY': () => ['pY', 'sin'],
        'sinX': () => ['pX', 'sin'],
        'rand': (r) => [r(0, 255)],
        'randX': (r) => [r(0, 255), 'pX', '*'],
        'randy': (r) => [r(0, 255), 'pY', '*'],
        'CIR': () => ['pX', 'pY', 'CIR']
    }
};

export const getToken = (tokenCreators, getRandomReal, getRandomInteger, type) => {

    let keys = Object.keys(tokenCreators[type]);
    let item = keys[getRandomInteger(0, keys.length - 1)];
    return tokenCreators[type][item](getRandomReal);
    
};

export const buildExpression = (tokenSelector, getRandomInteger, minSubexpressions, maxSubexpressions, currentDepth = 0) => {
    let expression = [];


    //Todo randomize whether or not to nest
    
    let type = getRandomInteger(1, 2);
    if(type === 1) {
        
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat(tokenSelector(OPERATOR_DOUBLE));
        } else {
            expression = expression.concat(tokenSelector(OPERAND));
            expression = expression.concat(tokenSelector(OPERAND));
            expression = expression.concat(tokenSelector(OPERATOR_DOUBLE));
        }
    } else {
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            
        } else {
            expression = expression.concat(tokenSelector(OPERAND));
        }
        expression = expression.concat(tokenSelector(OPERATOR_SINGLE));
    }
    
    return expression;
}

export const solveExpression = (tokenEvaluators, expression, x, y) => {
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
                let r = tokenEvaluators.operands[n](x, y);
                if(isNaN(r) || !isFinite(r)) {
                    r = Math.max(x, y);
                }
                operandStack.push(r);
            }
        }
    
        if(operandStack.length > 0 && operatorStack.length > 0) {
            let f = operatorStack.pop();
            let r, a, b;
            if(f.length === 1) {
                a = operandStack.pop();
                r = f(a);

                if(isNaN(r) || !isFinite(r)) {
                    r = a;
                }
                operandStack.push(r);

            } else if(operandStack.length > 1) {
                a = operandStack.pop();
                b = operandStack.pop();
                r = f(b, a);

                if(isNaN(r) || !isFinite(r)) {
                    r = Math.max(a, b);
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

export const mutateExpression = (getRandomInteger, tokenCreators, tokenSelector, expressionBuilder, expression) => {
    let mutatedExpression = [...expression];
    
    let index = getRandomInteger(0, mutatedExpression.length - 1);

    let token = mutatedExpression[index];

    if(tokenCreators.singleOperators.hasOwnProperty(token)) {

        //Swap token for another operand
        mutatedExpression.splice(index, 1, tokenSelector(OPERATOR_SINGLE));
    }

    if(tokenCreators.doubleOperators.hasOwnProperty(token)) {
        //Swap token for another operand
        mutatedExpression.splice(index, 1, tokenSelector(OPERATOR_DOUBLE));
    }

    if(tokenCreators.hasOwnProperty(token)) {
        let chance = getRandomInteger(0, 1);
        switch(chance) {
            case 0:
                //Swap token for another operand
                mutatedExpression.splice(index, 1, tokenSelector(OPERAND));
                break;
            case 1:
            default:
                //Swap token for a subexpression
                mutatedExpression.splice(index, 1, ...expressionBuilder(0, 6, 0))
                break;
        }
    }
    return mutatedExpression;
};

export const crossOverExpressions = (getRandomInteger, expressionA, expressionB)  => {
    let selection = getRandomInteger(0, 1);
    let parentFrom = selection === 1 ? expressionB : expressionA;
    let parentTo = selection === 1 ? expressionA : expressionB;
    

    let fromIndex = getRandomInteger(0, parentFrom.length - 1);
    
    let expression = parentFrom.slice(0, fromIndex);

    let toIndex = getRandomInteger(0, parentTo.length - 1);
    expression.splice(0, toIndex, ...expression);

    return expression;
}   



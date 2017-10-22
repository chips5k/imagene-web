
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
        '%': () => ['%'],
    },
    singleOperators: {
        'sin': ()=> ['sin'],
        'cos': ()=> ['cos'],
        'tan': ()=> ['tan'],
    },
    operands: {
        'pX': () => ['pX'],
        'pY': () => ['pY'],
        'PI': () => ['PI'],
        'xLog': ()=> ['pY', '1', '+', 'log'],
        'yLog': ()=> ['pX', '1', '+', 'log'],
        'xSqrt': ()=> ['pY', 'sqrt'],
        'yDouble': ()=> ['pY', 'double'],
        'yTriple': ()=> ['pY', 'triple'],
        'ySqrt': ()=> ['pX', 'sqrt'],
        'xDouble': ()=> ['pX', 'double'],
        'xTriple': ()=> ['pX', 'triple'],
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
                    console.log('Operand failure');
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
                    //console.log('Single Operator failure', a, f);
                    r = a;
                }
                operandStack.push(r);

            } else if(operandStack.length > 1) {
                a = operandStack.pop();
                b = operandStack.pop();
                r = f(b, a);

                if(isNaN(r) || !isFinite(r)) {
                   //console.log('Double Operator failure', f, a, b);
                   r = Math.min(a, b);
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

export const mutateExpression = (tokenCreators, getRandomInteger, tokenSelector, expressionBuilder, expression) => {
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


export const findBinaryTreeNodeByIndex = (node, currentIndex, index) => {
    
    if(currentIndex.value === index) {
        return node;
    }
    
    let result = null;
    if(node.a) {
        currentIndex.value++;
        result = findBinaryTreeNodeByIndex(node.a, currentIndex, index);
    }

    if(node.b && !result) {
        currentIndex.value++;
        result = findBinaryTreeNodeByIndex(node.b, currentIndex, index);
    }

    return result;
}
 
export const insertNodeIntoBinaryTreeAtIndex = (parentNode, key, node, currentIndex, index, nodeToInsert) => {
    
    if(currentIndex.value === index) {
        parentNode[key] = nodeToInsert;
        return true;
    }

    

    let result = null;
    if(node.a) {
        currentIndex.value++;
        result = insertNodeIntoBinaryTreeAtIndex(node, 'a', node.a, currentIndex, index, nodeToInsert);
    }

    if(node.b && !result) {
        currentIndex.value++;
        result = insertNodeIntoBinaryTreeAtIndex(node, 'b', node.b, currentIndex, index, nodeToInsert);
    }

    return result;
}

export const crossOverExpressions = (tokenEvaluators, getRandomInteger, expressionA, expressionB)  => {
    let selection = getRandomInteger(0, 1);
    let parentFrom = selection === 1 ? expressionB : expressionA;
    let parentTo = selection === 1 ? expressionA : expressionB;

    
    let fromIndex = getRandomInteger(0, parentFrom.length - 1);
    let toIndex = getRandomInteger(0, parentTo.length - 1);
    
    parentFrom = expressionToTree(tokenEvaluators, parentFrom);
    parentTo = expressionToTree(tokenEvaluators, parentTo);

    let node = findBinaryTreeNodeByIndex(parentFrom, {value: 0}, fromIndex);

    
    let root = {
        a: parentTo
    }

    
    if(node) {
        
        if(insertNodeIntoBinaryTreeAtIndex(root, 'a', parentTo, { value: 0 }, toIndex, node)) {
            return treeToExpression(root.a);  
        }
    }

    throw new Error('Failed to cross over expressions');
}   

export const expressionToTree = (tokenEvaluators, expression) => {
    
    let stack = [];
    let currentNode = null;
    let clonedExpression = expression.slice(0);
    while(clonedExpression.length) {

        let currentToken = clonedExpression.shift();

        if(!tokenEvaluators.doubleOperators.hasOwnProperty(currentToken) && !tokenEvaluators.singleOperators.hasOwnProperty(currentToken)) {
            stack.push(currentToken);
        } else {
            
            if(stack.length > 0) {
                let b = stack.pop();
                if(tokenEvaluators.singleOperators.hasOwnProperty(currentToken)) {
                    currentNode = {
                        value: currentToken, a: b
                    }
                    stack.push(currentNode);
                } else {
                    if(stack.length > 0) {
                        let a = stack.pop();
                        currentNode = { value: currentToken, a, b };
                        stack.push(currentNode);
                    }
                }
            }
        }
    }    

    if(stack.length === 1 && !currentNode) {
        currentNode = {
            value: stack.pop()
        }
    } else if (stack.length > 1) {
        throw new Error('Stack not empty - unhandled condition');
    }

    return currentNode;

}

export const treeToString = function(node) {
    
    
    var string = '';

    if(node.a) {
        string += '(';
        string += treeToString(node.a)
    }

    if(typeof node !== 'object') {
        string += node;
    } else {
        string += node.value;
    }
    
    if(node.b) {
        string += treeToString(node.b);
        
    }

    if(node.a) {
        string += ')';
    }

    return string;
}

export const treeToExpression = function(node) {

    let expression = [];
    if(typeof node === 'object') {
        
        if(node.hasOwnProperty('a')) {
            expression = expression.concat(treeToExpression(node.a));
        }

        if(node.hasOwnProperty('b')) {
            expression = expression.concat(treeToExpression(node.b));
        }

        if(node.hasOwnProperty('value')) {
            expression.push(node.value);
        }
    } else {
        expression.push(node);
    }

    return expression;
}
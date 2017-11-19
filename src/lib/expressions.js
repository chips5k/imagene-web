
export const OPERATOR_DOUBLE = 'doubleOperators';
export const OPERATOR_SINGLE = 'singleOperators';
export const OPERAND = 'operands';

export const tokenEvaluators =  {
        doubleOperators: {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '/': (a, b) => {
                return a / (b === 0 ? 0.000000000000001 : b);
            },
            '*': (a, b) => a * b, 
            '^': (a, b) => {
                if(a < 0 && (Math.abs(a) - parseInt(Math.abs(a), 10) >= 0)) {
                    return Math.pow(Math.abs(a === 0 ? a + 0.000000000000001 : a), b);
                } else {
                    return Math.pow(a, b);
                }
            },
            '%': (a, b) => {
                return a % (b === 0 ? 0.000000000000001 : b);
            },
            'CIR': (a, b) => Math.sin(Math.sqrt(a * a + b * b) * Math.PI / 180.00)
        },
        singleOperators: {
            'sqrt': (a) => Math.sqrt(Math.abs(a)),
            'double': (a) => Math.pow(a, 2),
            'triple': (a) => Math.pow(a, 3),
            'sin': (a) => Math.sin(a % 3.16),
            'cos': (a) => Math.cos(a % 3.16),
            'tan': (a) => Math.tan(a),
            'log': (a) => {
                return Math.log(Math.abs(a) === 0 ? 0.000000000000001 : Math.abs(a));
            }
        },
        operands: {
            'pX': (x, y) => x,
            'pY': (x, y) => y,
            'PI': () => Math.PI
        }
};

export const tokenCreators = {
    doubleOperators: {
        '+': () => ['+'],
        '-': () => ['-'],
        '/': () => ['/'],
        '*': () => ['*'], 
        '%': () => ['%'],
        '^': () => ['^'],
        'CIR': () => ['CIR']
    },
    singleOperators: {
        'sqrt': () => ['sqrt'],
        'sin': ()=> ['sin'],
        'cos': ()=> ['cos'],
        'tan': ()=> ['tan'],
        'log': () => ['log'],
        'double': () => ['double'],
        'triple': () => ['triple']
    },
    operands: {
        'pX': () => ['pX'],
        'pY': () => ['pY'],
        'PI': () => ['PI'],
        'PIx': () => ['PI', 'pX', '*'],
        'PIy': () => ['PI', 'pY', '*'],
        'cosX': () => ['pX', 'cos'],
        'cosY': () => ['pY', 'cos'],
        'sinX': () => ['pX', 'sin'],
        'sinY': () => ['pY', 'sin'],
        'tanX': () => ['pX', 'tan'],
        'tanY': () => ['pY', 'tan'],
        'rand': (r) => [r(-10000, 10000)],
        'randX': (r) => ['pX', r(-10000, 10000), '*'],
        'randY': (r) => ['pY', r(-10000, 10000), '*'],
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
    

    let type = getRandomInteger(1, 2);
    
    //Build a double expression
    if(type === 1) {
        
        //Build a nested double expression
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
        } else {
            //Build a flat double expression
            expression = expression.concat(tokenSelector(OPERAND));
            expression = expression.concat(tokenSelector(OPERAND));
        }

        expression = expression.concat(tokenSelector(OPERATOR_DOUBLE));

    }//Build a single expression 
    else {
        //Build a nested singular expression
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInteger(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildExpression(tokenSelector, getRandomInteger, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
        } else {
            //Build a flat singular expression
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
            //If double operator
            if(tokenEvaluators.doubleOperators.hasOwnProperty(n)) {
                operatorStack.push(tokenEvaluators.doubleOperators[n]);

            } //if single operator 
            else if(tokenEvaluators.singleOperators.hasOwnProperty(n)) {
                operatorStack.push(tokenEvaluators.singleOperators[n]);

            } //if operand 
            else if(tokenEvaluators.operands.hasOwnProperty(n)) {
                let a = tokenEvaluators.operands[n](x, y);
                if(isNaN(a)) {
                    
                } else if(!isFinite(a)) {
                    
                }

                operandStack.push(a);
            }
        }
        
        //If we have enough operands and operators to attempt a solution
        if(operandStack.length > 0 && operatorStack.length > 0) {
            //Pop the function
            let f = operatorStack.pop();
            //initialise result and argument vars
            let r, a, b;
            //If function only expects a single argument
            if(f.length === 1) {
                //Pop the first operand
                a = operandStack.pop();
                //Evaluate the function
                r = f(a);

                if(isNaN(r)) {
                    //console.log('Single Operator failure - NaN', f, a);
                    r = a;
                } else if(!isFinite(r)) {
                    //console.log('Single Operator failure - infinite', f, a);
                    //r = r === Number.POSITIVE_INFINITY ? Number.MAX_VALUE : -Number.MAX_VALUE;
                    r = a;
                }

                //Push the result back as an operand
                operandStack.push(r);

            } //Otherwise we are dealing with a double operator, so check if we have enough operands
            else if(operandStack.length > 1) {

                //Pop both arguments
                b = operandStack.pop();
                a = operandStack.pop();

                //And evaluate the function
                r = f(a, b);

                if(isNaN(r)) {
                    //console.log('Double Operator failure - NaN', f, a, b);
                    r = Math.max(a, b);
                } else if(!isFinite(r)) {
                    //console.log('Double Operator failure - infinite', f, a, b);
                    //r = r === Number.POSITIVE_INFINITY ? Number.MAX_VALUE : -Number.MAX_VALUE;
                    r = Math.max(a, b);
                }

                //Push the result back onto the operand stack
                operandStack.push(r);

            } else {
                //No solution return operator
                operatorStack.push(f);
            }
        }
    }

    //If we get to this point, and only a single operand exists, the solution has been found
    if(operandStack.length === 1 && operatorStack.length === 0) {
        //so return it
        return operandStack.pop();
    }
    
    //Otherwise we failed to solve
    throw new Error('Unable to solve expression: operands: ' + operandStack + ' operators: ' + operatorStack);
};

export const mutateExpression = (tokenEvaluators, getRandomInteger, getIndexToMutate, tokenSelector, expressionBuilder, expression) => {
    let mutatedExpression = [...expression];
    
    let index = getIndexToMutate(expression);

    let token = mutatedExpression[index];

    if(tokenEvaluators.singleOperators.hasOwnProperty(token)) {

        //Swap token for another operand
        mutatedExpression.splice(index, 1, ...tokenSelector(OPERATOR_SINGLE));
    }

    if(tokenEvaluators.doubleOperators.hasOwnProperty(token)) {
        //Swap token for another operand
        mutatedExpression.splice(index, 1, ...tokenSelector(OPERATOR_DOUBLE));
    }

    if(tokenEvaluators.operands.hasOwnProperty(token)) {
        let chance = getRandomInteger(0, 1);
        switch(chance) {
            case 0:
                //Swap token for another operand
                mutatedExpression.splice(index, 1, ...tokenSelector(OPERAND));
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



export const convertExpressionToWeightedArray = (tokenEvaluators, expression) => {
   let tree = expressionToTree(tokenEvaluators, expression);
    assignWeightToExpressionNode(tokenEvaluators, null, null, tree, 1, expression.length);
    return treeToExpression(tree);
};

export const assignWeightToExpressionNode = (tokenEvaluators, parent, key, node, depth, expressionLength) => {
    if(typeof node === 'object') {
        if(node.a) {
            assignWeightToExpressionNode(tokenEvaluators, node, 'a', node.a, depth + 1, expressionLength);
        }
        
        if(node.b) {
            assignWeightToExpressionNode(tokenEvaluators, node, 'b', node.b, depth + 1, expressionLength);
        }

        //if(tokenEvaluators.singleOperators[node.value] || tokenEvaluators.doubleOperators[node.value]) {
            node.value = depth;
        //} else {
            node.value = depth;
        //}
    } else {
        parent[key] = depth;
    }
}


export const crossOverExpressions = (tokenEvaluators, getExpressionAIndex, getExpressionBIndex, expressionA, expressionB)  => {

    const fromIndex = getExpressionAIndex(expressionA);
    const toIndex = getExpressionBIndex(expressionB);
    
    const parentFrom = expressionToTree(tokenEvaluators, expressionA.slice(0));
    const parentTo = expressionToTree(tokenEvaluators, expressionB.slice(0));

    const node = findBinaryTreeNodeByIndex(parentFrom, {value: 0}, fromIndex);

    
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
        throw new Error('Stack not empty - unhandled condition: ' + stack);
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

let operators = {
    '+': (a, b) => { 
        return a + b;
    },
    '-': (a, b) => { 
        return a - b 
    },
    '/': (a, b) => { 
        return a / b 
    },
    '*': (a, b) => { 
        return a * b; 
    },
    '^': (a, b) => { 
        return Math.pow(a, b); 
    },
};


let operands = {
    'pX': null,
    'pY': null,
    //'PI': () => Math.PI,
    'rand5': () => getRandomInt(0, 5),
}



function solveRpnExpression(expression, x, y) {
    let operandStack = [];
    let operatorStack = [];

    while(expression.length) {
    
        let n = expression.shift();
        
        if(!isNaN(parseFloat(n))) {
            operandStack.push(n);
        } else {
            if(operators.hasOwnProperty(n)) {
                operatorStack.push(operators[n]);
            } else if(operands.hasOwnProperty(n)) {

                //If operand has a function body, use it
                if(operands[n] !== null) {
                    n = operands[n]()
                } else {
                    //Otherwise we are dealing with pixel locations

                    //supply current x value if operand type is pX
                    if(n === 'pX') {
                        n = x;
                    } else if(n === 'pY') {
                        n = y;
                    }
                }

                operandStack.push(n);
            }
        }
    
        if(operandStack.length > 1 && operatorStack.length > 0) {
            let f = operatorStack.pop();
            let a = operandStack.pop();
            let b = operandStack.pop();
            operandStack.push(f(b, a));
        }
    }
    
    if(operandStack.length === 1) {
        return operandStack.pop();
    }
    
    return false;
}

function rpnToTree(stringExpression) {

}

function treeToRpn(tree) {

}

/**
 * 
 * @param {Numerically indexed array of operand characters/strings} operands 
 * @param {Numerically indexed array of operator characters/strings} operators 
 * @param {Integer} maxSubexpressions 
 * @param {Integer} currentDepth 
 */
function buildRpnExpression(operands, operators, maxSubexpressions, currentDepth) {
    
    let expression = [];

    //Todo randomize whether or not to nest

    

    if(currentDepth < maxSubexpressions) {
        let currentMaxSubExpressions = getRandomInt(0, maxSubexpressions - 1);
        expression = expression.concat(buildRpnExpression(operands, operators, currentMaxSubExpressions, currentDepth + 1));
        expression = expression.concat(buildRpnExpression(operands, operators, currentMaxSubExpressions, currentDepth + 1));
        expression = expression.concat((operators[getRandomInt(0, operators.length)]));
    } else {
        expression = expression.concat((operands[getRandomInt(0, operands.length)]));
        expression = expression.concat((operands[getRandomInt(0, operands.length)]));
        expression = expression.concat((operators[getRandomInt(0, operators.length)]));
    }
    
    return expression;
}

function rpnMutator(expression) {

}

function rpnBreeder(expressionA, expressionB) {

}


/** The following are taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let operators = {
    double: {
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
        }
    },
    single: {
        'sin': (a) => {
            return Math.sin(a % Math.PI)
        },
        'cos': (a) => {
            return Math.cos(a % Math.PI)
        },
        'tan': (a) => {
            return Math.tan(a % Math.PI)
        },
        'log': (a) => {
            return Math.log(Math.abs(a));
        }
    }
};


let operands = {
    'pX': (x, y) => x,
    'pY': (x, y) => y,
    'PI': (x, y) => Math.PI,
    'rand': (x, y) => getRandomArbitrary(0, 10000),
}



function solveRpnExpression(expression, x, y) {
    let operandStack = [];
    let operatorStack = [];

    while(expression.length) {
        let n = expression.shift();
        if(!isNaN(parseFloat(n))) {
            operandStack.push(n);
        } else {
            if(operators.double.hasOwnProperty(n)) {
                operatorStack.push(operators.double[n]);
            } else if(operators.single.hasOwnProperty(n)) {
                operatorStack.push(operators.single[n]);
            } else if(operands.hasOwnProperty(n)) {
                operandStack.push(operands[n](x, y));
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
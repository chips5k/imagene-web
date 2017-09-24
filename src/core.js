let ids = 0;

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
        },
        '%': (a, b) => {
            return a % b;
        },
        'CIR': (a, b) => {
            return Math.sin(Math.sqrt(a * a + b * b) * Math.PI / 180.00);
        }
    },
    single: {
        'sqrt': (a) => {
            return Math.sqrt(Math.abs(a));
        },
        'sin': (a) => {
            return Math.sin(a % 3.16)
        },
        'cos': (a) => {
            return Math.cos(a % 3.16)
        },
        'tan': (a) => {
            return Math.tan(a)
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
    'rand': (x, y) => getRandomArbitrary(0, 1000),
}

export const solveRpnExpression = function(expression, x, y) {
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
function buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, maxSubexpressions, currentDepth) {
    
    let expression = [];

    //Todo randomize whether or not to nest

    let type = getRandomInt(1, 3);
    


    if(type === 1) {

        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInt(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat((doubleOperators[getRandomInt(0, doubleOperators.length)]));
        } else {
            expression = expression.concat((operands[getRandomInt(0, operands.length)]));
            expression = expression.concat((operands[getRandomInt(0, operands.length)]));
            expression = expression.concat((doubleOperators[getRandomInt(0, doubleOperators.length)]));
        }
    } else {
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInt(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            
        } else {
            expression = expression.concat((operands[getRandomInt(0, operands.length)]));
        }
        
        
        expression = expression.concat((singleOperators[getRandomInt(0, singleOperators.length)]));
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

export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const generatePopulation = (size, minDepth, maxDepth) => {
    
    
    let population = [];
    if(size < 1) {
        throw new Error('Size cannot be less than one');
    }
    if(size > 24) {
        throw new Error('Size of population is too large');
    }

    if(minDepth > 12) {
        throw new Error('Size of population is too large');
    }

    if(minDepth > 12) {
        throw new Error('Size of population is too large');
    }

    if(minDepth > maxDepth) {
        throw new Error('Min Depth cannot be greater than max depth');
    }

    if(minDepth < 0) {
        throw new Error('Min Depth cannot be less than zero');
    }

    if(maxDepth < 0) {
        throw new Error('Max Depth cannot be less than zero');
    }

    if(maxDepth > 24) {
        throw new Error('Size of population is too large');
    }
    for(let i = 0; i < size; i ++) {
        population.push({
            id: i + 1,
            expression: buildRpnExpression(Object.keys(operands), Object.keys(operators.single), Object.keys(operators.double), minDepth, maxDepth, 0),
            fitness: 0
        });
    }

   

    return population;
}

export const generateSamples = function(generation) {
    let samples = [];

    for(var i = 0; i < generation.config.numSamples; i++) {
        samples.push({
            id: ++ids,
            red: generation.population.individuals[getRandomInt(0, generation.population.individuals.length)].id,
            green: generation.population.individuals[getRandomInt(0, generation.population.individuals.length)].id,
            blue:generation.population.individuals[getRandomInt(0, generation.population.individuals.length)].id,
        });
    }

    return samples;
}
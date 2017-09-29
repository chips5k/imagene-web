let ids = {
    generations: 0,
    samples: 0,
    individuals: 0 
};

let operators = {
    double: {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '/': (a, b) => a / b,
        '*': (a, b) => a * b, 
        '^': (a, b) => Math.pow(a, b),
        '%': (a, b) => a % b,
        'CIR': (a, b) => Math.sin(Math.sqrt(a * a + b * b) * Math.PI / 180.00)
    },
    single: {
        'sqrt': a => Math.sqrt(Math.abs(a)),
        'double': a => Math.pow(a, 2),
        'triple': a => Math.pow(a, 3),
        'sin': a => Math.sin(a % 3.16),
        'cos': a => Math.cos(a % 3.16),
        'tan': a => Math.tan(a),
        'log': a => Math.log(Math.abs(a))
    }
};

let operands = {
    'pX': (x, y) => x,
    'pY': (x, y) => y,
    'PIx': (x, y) => x * Math.PI,
    'PIy': (x, y) => y * Math.PI,
    'cosY': (x, y) => Math.cos(y),
    'cosX': (x, y) => Math.cos(x),
    'sinY': (x, y) => Math.sin(x),
    'sinX': (x, y) => Math.sin(y),
    'rand': (x, y) => getRandomArbitrary(0, 255),
    'randX': (x, y) => Math.random * x,
    'randy': (x, y) => Math.random * y,
    'CIR': (x, y) => Math.sin(Math.sqrt(x * x + y * y) * Math.PI / 180.00)
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
                let r = operands[n](x, y);
                if(isNaN(r)) {
                    r = getRandomInt(x > y ? y : x, y);
                }
                operandStack.push(r);
            }
        }
    
        if(operandStack.length > 1 && operatorStack.length > 0) {
            let f = operatorStack.pop();
            let a = operandStack.pop();
            let b = operandStack.pop();
            let r = f(b, a);
            if(isNaN(r)) { 
                r = a;
            }
            operandStack.push(r);
        }
    }
    
    if(operandStack.length === 1) {
        return operandStack.pop();
    }
    
    return false;
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


/** The following are taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export const getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export const generateIndividuals = (size, minDepth, maxDepth) => {
    
    
    let individuals = [];
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
        individuals.push({
            id: i + 1,
            expression: buildRpnExpression(Object.keys(operands), Object.keys(operators.single), Object.keys(operators.double), minDepth, maxDepth, 0),
            fitness: 0
        });
    }

   

    return individuals;
}

export const generateSamples = function(generation, config) {
    let samples = [];

    for(var i = 0; i < config.numSamples; i++) {
        samples.push({
            id: ++ids.samples,
            redIndividualId: generation.individuals[getRandomInt(0, generation.individuals.length)].id,
            greenIndividualId: generation.individuals[getRandomInt(0, generation.individuals.length)].id,
            blueIndividualId:generation.individuals[getRandomInt(0, generation.individuals.length)].id,
            redThresholdMax: config.redThresholdMax, redThresholdMin: config.redThresholdMin,
            greenThresholdMax: config.greenThresholdMax, greenThresholdMin: config.greenThresholdMin,
            blueThresholdMax: config.blueThresholdMax, blueThresholdMin: config.blueThresholdMin,
            width: config.sampleWidth, height: config.sampleHeight,
            cache: {}
        });
    }

    return samples;
}

export const createGeneration = function(generation = null) {

    if(generation !== null) {
        //Evolve a new generation
        return {
            id: ++ids.generations,
            individuals: [],
            minDepth: 0,
            maxDepth: 12,
            size: 24,
            samples: []
        };
    }

    return {
        id: ++ids.generations,
        individuals: [],
        minDepth: 0,
        maxDepth: 12,
        size: 24,
        samples: []
    };

}
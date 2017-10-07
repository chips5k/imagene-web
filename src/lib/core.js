import { cloneDeep } from 'lodash';
import Random from 'random-js';

var random = new Random(Random.engines.mt19937().autoSeed());

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
    'PI': (x, y) => Math.PI,
    'PIx': (x, y) => x * Math.PI,
    'PIy': (x, y) => y * Math.PI,
    'cosY': (x, y) => Math.cos(y),
    'cosX': (x, y) => Math.cos(x),
    'sinY': (x, y) => Math.sin(x),
    'sinX': (x, y) => Math.sin(y),
    'rand': (x, y) => getRandomArbitrary(0, 255),
    'randX': (x, y) => getRandomArbitrary(0, 255) * x,
    'randy': (x, y) => getRandomArbitrary(0, 255) * y,
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

    let type = getRandomInt(1, 2);
    


    if(type === 1) {

        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInt(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            expression = expression.concat((doubleOperators[getRandomInt(0, doubleOperators.length - 1)]));
        } else {
            expression = expression.concat((operands[getRandomInt(0, operands.length - 1)]));
            expression = expression.concat((operands[getRandomInt(0, operands.length - 1)]));
            expression = expression.concat((doubleOperators[getRandomInt(0, doubleOperators.length - 1)]));
        }
    } else {
        if(currentDepth < maxSubexpressions) {
            let currentMaxSubExpressions = getRandomInt(minSubexpressions, maxSubexpressions);
            expression = expression.concat(buildRpnExpression(operands, singleOperators, doubleOperators, minSubexpressions, currentMaxSubExpressions, currentDepth + 1));
            
        } else {
            expression = expression.concat((operands[getRandomInt(0, operands.length - 1)]));
        }
        
        
        expression = expression.concat((singleOperators[getRandomInt(0, singleOperators.length - 1)]));
    }
    

    return expression;
}


/** The following are taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomArbitrary(min, max) {
    return random.real(min, max, true);
}

export const getRandomInt = function(min, max) {
    return random.integer(min, max);
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
            redIndividualId: generation.individuals[getRandomInt(0, generation.individuals.length - 1)].id,
            greenIndividualId: generation.individuals[getRandomInt(0, generation.individuals.length - 1)].id,
            blueIndividualId:generation.individuals[getRandomInt(0, generation.individuals.length - 1)].id,
            redThresholdMax: config.redThresholdMax, redThresholdMin: config.redThresholdMin,
            greenThresholdMax: config.greenThresholdMax, greenThresholdMin: config.greenThresholdMin,
            blueThresholdMax: config.blueThresholdMax, blueThresholdMin: config.blueThresholdMin,
            width: config.sampleWidth, height: config.sampleHeight,
            fitness: 0,
            cache: {}
        });
    }

    return samples;
}

function mutateIndividual(individual) {

    let expression = [...individual.expression];
    
    let index = getRandomInt(0, expression.length - 1);

    let item = expression[index];

    if(operators.single.hasOwnProperty(item)) {

        let singleOperatorsIndexed = Object.keys(operators.single);
        //Swap item for another operand
        expression.splice(index, 1, singleOperatorsIndexed[getRandomInt(0, singleOperatorsIndexed.length - 1)]);
    }

    if(operators.double.hasOwnProperty(item)) {
        let doubleOperatorsIndexed = Object.keys(operators.single);
        //Swap item for another operand
        expression.splice(index, 1, doubleOperatorsIndexed[getRandomInt(0, doubleOperatorsIndexed.length - 1)]);
    }

    if(operands.hasOwnProperty(item)) {
        let chance = getRandomInt(0, 1);
        switch(chance) {
            case 0:
                let operandsIndexed = Object.keys(operands);
                //Swap item for another operand
                expression.splice(index, 1, operandsIndexed[getRandomInt(0, operandsIndexed.length - 1)]);
                break;
            case 1:
            default:
                //Swap item for a subexpression
                expression.splice(index, 1, ...buildRpnExpression(Object.keys(operands), Object.keys(operators.single), Object.keys(operators.double), 0, 6, 0))
                break;
        }
    }
    return {...individual, expression};
}

function crossOverIndividuals(individualA, individualB) {

    let selection = getRandomInt(0, 1);
    let parentFrom = selection === 1 ? individualB : individualA;
    let parentTo = selection === 1 ? individualA : individualB;
    

    let fromIndex = getRandomInt(0, parentFrom.expression.length - 1);
    //Find all operator nodes
    let expression = parentFrom.expression.slice(0, fromIndex);

    let toIndex = getRandomInt(0, parentTo.expression.length - 1);

    let individual = {...parentTo, id: ++ids.individuals, expression: [...parentTo.expression]};
    individual.expression.splice(0, toIndex, ...expression);

    return individual;
}

export const evolveIndividuals = function(individuals) {

    if(generation !== null) {

        let individuals = [];
        let previousIndividuals = cloneDeep(generation.individuals);

        let methods = [
            {
                type: 'elitism',
                fitness: 0.5
            }, 
            {
                type: 'crossover',
                fitness: 0.5
            }, 
            {
                type: 'mutation',
                fitness: 0.5
            }
        ];


        let selectedIndividualIndex;
        let iteration = 0;
        let limit = generation.size;
        while(individuals.length < limit && iteration < limit) {

            iteration++;

            //Determine what to do this iteration
            let method = methods[rouletteWheelSelection(methods)];

            switch(method.type) {   
                case 'elitism':
                    selectedIndividualIndex = rouletteWheelSelection(previousIndividuals);
                    if(selectedIndividualIndex !== -1) {
                        individuals.push(previousIndividuals.splice(selectedIndividualIndex, 1)[0]);
                    } else {
                        limit--;
                    }
                    
                    break;

                //Crossover
                case 'crossover':
                    //Select two parents for crossover
                    let parentAIndex = rouletteWheelSelection(previousIndividuals);
                    let parentBIndex = rouletteWheelSelection(previousIndividuals, [parentAIndex]);

                    if(parentAIndex !== -1 && parentBIndex !== -1) {
                        //determine number of children to produce 
                        let numChildren = getRandomInt(1, 3);

                        //Generate children via crossover
                        for(let i = 0; i < numChildren; i++) {
                            individuals.push(crossOverIndividuals(previousIndividuals[parentAIndex], previousIndividuals[parentBIndex]));
                        }
                    }

                    break;

                //Mutation
                case 'mutation':
                    selectedIndividualIndex = rouletteWheelSelection(previousIndividuals);
                    if(selectedIndividualIndex !== -1) {
                        individuals.push(mutateIndividual(previousIndividuals.splice(selectedIndividualIndex, 1)[0]));
                    } else {
                        limit--;
                    }

                    break;
                default:
                    break;
            }
        }

        //Evolve a new generation
        return {
            id: ++ids.generations,
            individuals: individuals,
            minDepth: null,
            maxDepth: null,
            size: individuals.length,
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

export const createSample = (generationId, individuals, width, height, redThreshold, greenThreshold, blueThreshold) => {
    let indexes = [];
    
    indexes.push(rouletteWheelSelection(individuals)); 
    indexes.push(rouletteWheelSelection(individuals, indexes)); 
    indexes.push(rouletteWheelSelection(individuals, indexes)); 
    
    return {
        generationId,
        redIndividual: individuals[indexes[0]].id,
        greenIndividual: individuals[indexes[1]].id,
        blueIndividual: individuals[indexes[2]].id,
        width, height,
        redThreshold, greenThreshold, blueThreshold
    }
}


//Adapted from http://www.obitko.com/tutorials/genetic-algorithms/selection.php AND https://en.wikipedia.org/wiki/Fitness_proportionate_selection
export const rouletteWheelSelection = function(individuals, excludedIndexes) {
        
    //[Sum] Calculate sum of all chromosome fitnesses in population - sum S.
    let s = individuals.map(n => n.fitness).reduce((a, n) => a + n);
  
    
    //[Select] Generate random number from interval (0,S) - r.
    let r = getRandomArbitrary(0, s);
    

    let c = 0;
    // [Loop] Go through the population and sum fitnesses from 0 - sum s.
    for(var i = 0; i < individuals.length; i++) {
        c += individuals[i].fitness;
        
        //When the sum s is greater then r, stop and return the chromosome where you are.
        if(c > r) {
            if(excludedIndexes) {
                if(excludedIndexes.indexOf(i) === -1) {
                    return i;
                }
            } else {
                return i;
            }
        }
    }
    
    return -1;
}

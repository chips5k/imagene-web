importScripts('./decimal.min.js');

Decimal.set({ precision: 5, rounding: 4 });

/** The following are taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomArbitrary(min, max) {
    return Decimal.random().mul(max.sub(min)).add(min);
}

getRandomInt = function(min, max) {
    min = Decimal.ceil(min);
    max = Decimal.floor(max);
    return Decimal.floor(Decimal.random().mul(max.sub(min)).add(min)); //The maximum is exclusive and the minimum is inclusive
}



let operators = {
    double: {
        '+': (a, b) => { 
            return a.add(b);
        },
        '-': (a, b) => { 
            return a.sub(b) 
        },
        '/': (a, b) => { 
            return a.div(b) 
        },
        '*': (a, b) => { 
            return a.mul(b); 
        },
        '^': (a, b) => { 
            return a.pow(b); 
        },
        '%': (a, b) => {
            return a.mod(b);
        },
        'CIR': (a, b) => {
            return Decimal.sin(Decimal.sqrt(a.mul(a).add(b.mul(b)).mul(new Decimal(Math.PI).div(180.00))));
        }
    },
    single: {
        'sqrt': (a) => {
            return Decimal.sqrt(a.abs());
        },
        'double': (a) => {
            return Decimal.pow(a, 2);
        },
        'triple': (a) => {
            return Decimal.pow(a, 3);
        },
        'sin': (a) => {
            return Decimal.sin(a.mod(3.16))
        },
        'cos': (a) => {
            return Decimal.cos(a.mod(3.16))
        },
        'tan': (a) => {
            return Decimal.tan(a.mod(3.16))
        },
        'log': (a) => {
            return Decimal.log(a.abs());
        }
    }
};

let operands = {
    'pX': (x, y) => new Decimal(x),
    'pY': (x, y) => new Decimal(y),
    'PIx': (x, y) => new Decimal(x).mul(Math.PI),
    'cosY': (x, y) => Decimal.cos(y),
    'cosX': (x, y) => Decimal.cos(x),
    'sinY': (x, y) => Decimal.sin(y),
    'sinX': (x, y) => Decimal.sin(x),
    'PIy': (x, y) => new Decimal(y).mul(Math.PI),
    'randX': (x, y) => getRandomArbitrary(new Decimal(0), new Decimal(255)).mul(x),
    'randy': (x, y) => getRandomArbitrary(new Decimal(0), new Decimal(255)).mul(y),
    'CIR': (a, b) => {
        return Decimal.sin(Decimal.sqrt(a.mul(a).add(b.mul(b)).mul(new Decimal(Math.PI).div(180.00))));
    }
}


solveRpnExpression = function(expression, x, y) {
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
                operandStack.push(r);
            }
        }
    
        if(operandStack.length > 1 && operatorStack.length > 0) {
            let f = operatorStack.pop();
            let a = operandStack.pop();
            let b = operandStack.pop();
            let r = f(b, a);
            operandStack.push(r);
        }
    }
    
    if(operandStack.length === 1) {
        return operandStack.pop();
    }
    
    return false;
}

onmessage = function(e) {
    
    let rgbRange = {
        min: { r: false, g: false, b: false, all: false},
        max: { r: false, g: false, b: false, all: false}
    };
    
    let array = [];

    for(let i = 0; i < e.data.image.data.length; i += 4) {
       
        let x = i / 4 % e.data.image.width;
        let y = Math.floor(i / 4 / e.data.image.width);

        
        let r = solveRpnExpression(e.data.red.expression.slice(0), x, y);
        let g = solveRpnExpression(e.data.green.expression.slice(0), x, y);
        let b = solveRpnExpression(e.data.blue.expression.slice(0), x, y);


        array[i] = r;
        array[i + 1] = g;
        array[i + 2] = b;
        array[i + 3] = 255;
       
        if(rgbRange.min.r === false || r.lessThan(rgbRange.min.r)) {
            rgbRange.min.r = r;
        }

        if(rgbRange.min.g === false || g.lessThan(rgbRange.min.g)) {
            rgbRange.min.g = g;
        }

        if(rgbRange.min.b === false || b.lessThan(rgbRange.min.b)) {
            rgbRange.min.b = b;
        }

        if(rgbRange.max.r === false || r.greaterThan(rgbRange.max.r)) {
            rgbRange.max.r = r;
        }

        if(rgbRange.max.g === false || g.greaterThan(rgbRange.max.g)) {
            rgbRange.max.g = g;
        }

        if(rgbRange.max.b === false || b.greaterThan(rgbRange.max.b)) {
            rgbRange.max.b = b;
        }

    }
    
    
    let diffs = {
        r: rgbRange.max.r.sub(rgbRange.min.r),
        g: rgbRange.max.g.sub(rgbRange.min.g),
        b: rgbRange.max.b.sub(rgbRange.min.b),
    }
    
    let thresholdRanges = {
        r: e.data.config.redThresholdMax - e.data.config.redThresholdMin,
        g: e.data.config.greenThresholdMax - e.data.config.greenThresholdMin,
        b: e.data.config.blueThresholdMax - e.data.config.blueThresholdMin
    }

   


    for(let i = 0; i < e.data.image.data.length; i+=4) {
        
        let r = array[i];
        let g = array[i + 1];
        let b = array[i + 2];
        let a = array[i + 3];

        e.data.image.data[i] = parseInt(r.sub(rgbRange.min.r).mul(thresholdRanges.r).div(rgbRange.max.r - rgbRange.min.r).add(e.data.config.redThresholdMin));
        e.data.image.data[i + 1] =  parseInt(g.sub(rgbRange.min.g).mul(thresholdRanges.g).div(rgbRange.max.g - rgbRange.min.g).add(e.data.config.greenThresholdMin));
        e.data.image.data[i + 2] =  parseInt(b.sub(rgbRange.min.b).mul(thresholdRanges.b).div(rgbRange.max.b - rgbRange.min.b).add(e.data.config.blueThresholdMin));
        e.data.image.data[i + 3] = a;
    }   

   console.log(e.data.image.data);
    
    postMessage(e.data.image);

}
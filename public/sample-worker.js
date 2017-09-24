/** The following are taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


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

onmessage = function(e) {
    
    let grid = [];
    
    let rgbRange = {
        min: { r: false, g: false, b: false, all: false},
        max: { r: false, g: false, b: false, all: false}
    };

    
    let length = e.data.image.data.length / 4;
    
    for(var i = 0; i < length; i++) {
       
        let x = i % e.data.image.width;
        let y = Math.floor(i / e.data.image.width);
        
        let r = solveRpnExpression(e.data.red.expression.slice(0), x, y);
        let g = solveRpnExpression(e.data.green.expression.slice(0), x, y);
        let b = solveRpnExpression(e.data.blue.expression.slice(0), x, y);

        e.data.image.data[i] = r;
        e.data.image.data[i + 1] = g;
        e.data.image.data[i + 2] = b;
       
        if(isFinite(r) && (r < rgbRange.min.r || rgbRange.min.r === false)) {
            rgbRange.min.r = r;
        }

        if(isFinite(g) && (g < rgbRange.min.g || rgbRange.min.g === false)) {
            rgbRange.min.g = g;
        }

        if(isFinite(b) && (b < rgbRange.min.b || rgbRange.min.b === false)) {
            rgbRange.min.b = b;
        }

        if(isFinite(r) && (r > rgbRange.max.r || rgbRange.max.r === false)) {
            rgbRange.max.r = r;
        }

        if(isFinite(g) && (g > rgbRange.max.g || rgbRange.max.g === false)) {
            rgbRange.max.g = g;
        }

        if(isFinite(b) && (b > rgbRange.max.b || rgbRange.max.b === false)) {
            rgbRange.max.b = b;
        }

    }

   
    let diffs = {
        r: rgbRange.max.r - rgbRange.min.r,
        g: rgbRange.max.g - rgbRange.min.g,
        b: rgbRange.max.b - rgbRange.min.b,
    }
    
    for(var i = 0; i < length; i++) {
        
         let r = e.data.image[i];
         let g = e.data.image[i + 1];
         let b = e.data.image[i + 2];

         e.data.image[i] = (r - rgbRange.min.r) / diffs.r * 255;
         e.data.image[i + 1] = (r - rgbRange.min.r) / diffs.r * 255;
         e.data.image[i + 2] = (r - rgbRange.min.r) / diffs.r * 255;
    }

    postMessage(e.data.image);
}
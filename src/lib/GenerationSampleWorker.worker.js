import {solveExpression, tokenEvaluators} from './expressions';

//Small hack to support unit tests na dissues with mocking a web worker
if(!global) {
    globals = this;
}

global.onmessage = function(e) {
    let dataArray = new Uint8ClampedArray(e.data.sample.width * e.data.sample.height * 4);
    
    let rgbRange = {
        min: { r: false, g: false, b: false, all: false},
        max: { r: false, g: false, b: false, all: false}
    };
    
    let array = [];

    for(let i = 0; i < dataArray.length; i += 4) {
       
        let x = i / 4 % e.data.sample.width;
        let y = Math.floor(i / 4 / e.data.sample.height);
        let evaluateX = x + 1;
        let evaluateY = y + 1;

        if(e.data.coordinateType === 'polar') { 
            let r, a;
            evaluateX -= (e.data.sample.width / 2);
            evaluateY -= (e.data.sample.height / 2);
            
            r = Math.sqrt(Math.pow(evaluateX, 2) + Math.pow(evaluateY, 2));

            /* -90 to +270 */
            // if (x == 0 && y == 0) {
            //     a = 0;
            // } else if (x >= 0) {
            //     a = Math.asin(evaluateY / r);
            // } else if (x < 0) {
            //     a = 0 - Math.asin(evaluateY / r) + Math.PI;
            // }

            /* 0 to 360 */
            // if (evaluateX > 0 && evaluateY >= 0){
            //     a = Math.atan(evaluateY / evaluateX);
            // }
            // else if (evaluateX > 0 && evaluateY < 0) {
            //     a = Math.atan(evaluateY / evaluateX) + Math.PI + Math.PI;
            // }
            // else if (evaluateX < 0) {
            //     a = Math.atan(evaluateY / evaluateX) + Math.PI;
            // }
            // else if (evaluateX == 0 && evaluateY > 0) {
            //     a = Math.PI / 2;
            // }
            // else if (evaluateX == 0 && evaluateY < 0) {
            //     a = 3 / 2 * Math.PI;
            // }
            // else if (evaluateX == 0 && evaluateY == 0) {
            //     a = 0;
            // }

            
            /* -180 to +180 */
            if (evaluateX > 0) { 
                a = Math.atan(evaluateY / evaluateX); 
            } else if (evaluateX < 0 && evaluateY >= 0) {
                a = Math.atan(evaluateY / evaluateX) + Math.PI;
            } else if (evaluateX < 0 && evaluateY < 0) {
                a = Math.atan(evaluateY / evaluateX) - Math.PI;
            } else if (evaluateX == 0 && evaluateY > 0) {
                a = Math.PI / 2;
            } else if (evaluateX == 0 && evaluateY < 0) {
                a = 0 - Math.PI / 2;
            } else if (evaluateX == 0 && evaluateY == 0) {
                a = 0
            }

            evaluateX = r;
            evaluateY = a;
            
        }   
        

        let r = solveExpression(tokenEvaluators, e.data.sample.redIndividual.expression.slice(0), evaluateX, evaluateY);
        let g = solveExpression(tokenEvaluators, e.data.sample.greenIndividual.expression.slice(0), evaluateX, evaluateY);
        let b = solveExpression(tokenEvaluators, e.data.sample.blueIndividual.expression.slice(0), evaluateX, evaluateY);

        array[i] = r;
        array[i + 1] = g;
        array[i + 2] = b;
        array[i + 3] = 255;
       
       
        if(rgbRange.min.r === false || r < (rgbRange.min.r)) {
            rgbRange.min.r = r;
        }

        if(rgbRange.min.g === false || g < (rgbRange.min.g)) {
            rgbRange.min.g = g;
        }

        if(rgbRange.min.b === false || b < (rgbRange.min.b)) {
            rgbRange.min.b = b;
        }

        if(rgbRange.max.r === false || r > (rgbRange.max.r)) {
            rgbRange.max.r = r;
        }

        if(rgbRange.max.g === false || g > (rgbRange.max.g)) {
            rgbRange.max.g = g;
        }

        if(rgbRange.max.b === false || b > (rgbRange.max.b)) {
            rgbRange.max.b = b;
        }
    }
    
    
    let diffs = {
        r: rgbRange.max.r - rgbRange.min.r,
        g: rgbRange.max.g - rgbRange.min.g,
        b: rgbRange.max.b - rgbRange.min.b,
    }
    
    let thresholdRanges = {
        r: e.data.sample.redThreshold[1] - e.data.sample.redThreshold[0],
        g: e.data.sample.greenThreshold[1] - e.data.sample.greenThreshold[0],
        b: e.data.sample.blueThreshold[1] - e.data.sample.blueThreshold[0]
    }
    
    for(let i = 0; i < dataArray.length; i+=4) {
        
        let r = array[i];
        let g = array[i + 1];
        let b = array[i + 2];
        let a = array[i + 3];
        
        dataArray[i] = ((r - rgbRange.min.r) * thresholdRanges.r / diffs.r) + e.data.sample.redThreshold[0];
        dataArray[i + 1] = ((g - rgbRange.min.g) * thresholdRanges.g / diffs.g) + e.data.sample.greenThreshold[0];
        dataArray[i + 2] = ((b - rgbRange.min.b) * thresholdRanges.b / diffs.b) + e.data.sample.blueThreshold[0];
        dataArray[i + 3] = a;
    }

    postMessage(dataArray);

}.bind(this);
import { solveRpnExpression } from './core.js';


onmessage = function(e) {

    let rgbRange = {
        min: { r: false, g: false, b: false, all: false},
        max: { r: false, g: false, b: false, all: false}
    };
    
    let array = [];

    for(let i = 0; i < e.data.image.data.length; i += 4) {
       
        let x = i / 4 % e.data.image.width;
        let y = Math.floor(i / 4 / e.data.image.width);
        let evaluateX = x;
        let evaluateY = y;

        if(e.data.coordinateType === 'polar') { 
            let r, a;
            evaluateX -= e.data.image.width / 2;
            evaluateY -= e.data.image.height / 2;
            r = Math.sqrt(Math.pow(evaluateX, 2), Math.pow(evaluateY, 2));

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

        
        let r = solveRpnExpression(e.data.redIndividual.expression.slice(0), evaluateX, evaluateY);
        let g = solveRpnExpression(e.data.greenIndividual.expression.slice(0), evaluateX, evaluateY);
        let b = solveRpnExpression(e.data.blueIndividual.expression.slice(0), evaluateX, evaluateY);

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
        r: e.data.sample.redThresholdMax - e.data.sample.redThresholdMin,
        g: e.data.sample.greenThresholdMax - e.data.sample.greenThresholdMin,
        b: e.data.sample.blueThresholdMax - e.data.sample.blueThresholdMin
    }

    for(let i = 0; i < e.data.image.data.length; i+=4) {
        
        let r = array[i];
        let g = array[i + 1];
        let b = array[i + 2];
        let a = array[i + 3];
        
        e.data.image.data[i] = ((r - rgbRange.min.r) * thresholdRanges.r / diffs.r) + e.data.sample.redThresholdMin;
        e.data.image.data[i + 1] = ((g - rgbRange.min.g) * thresholdRanges.g / diffs.g) + e.data.sample.greenThresholdMin;
        e.data.image.data[i + 2] = ((b - rgbRange.min.b) * thresholdRanges.b / diffs.b) + e.data.sample.blueThresholdMin;
        e.data.image.data[i + 3] = a;

    }   

    postMessage(e.data.image);

}
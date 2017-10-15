// import * as core from '../../lib/core';
// describe('core', () => {

//     describe('solveRpnExpression', () => {

//         it('should solve rpn expressions', () => {
//             expect(core.solveRpnExpression(tokenSet, ['pX', 'pY', '+'], 4, 5)).toEqual(4 + 5);
//             expect(core.solveRpnExpression(tokenSet, ['pX', 'cosY', '*', 'pY', '-'], 6, 7)).toEqual((6 * Math.cos(7)) - 7);

//         });

//         it('should correctly differentiate between single and multiple argument functions', () => {
//             expect(() => {core.solveRpnExpression(tokenSet, ['10', '^']) }).toThrow('Unable to solve expression');
//         });

//         it('should solve double argument functions', () => {
//             expect(core.solveRpnExpression(tokenSet, ['10', '5', '+'])).toEqual(10 + 5);
//             expect(core.solveRpnExpression(tokenSet, ['10', '5', '^'])).toEqual(Math.pow(10, 5));
//         });

//         it('should solve single argument functions', () => {
//             let x = 12;
//             let y = 6;
//             let expression = ['14', '8', '+', 'tan'];
//             let infix = Math.tan(14 + 8);
//             expect(core.solveRpnExpression(tokenSet, expression, x, y)).toEqual(infix);
//         });

//         it('should solve deeply nested expressions correctly', () => {
//             let x = 88;
//             let y = 14;
//             let expression = ['pX', 'pY', '^', '5', 'pX', '*', '/', '10', '3.14', '*', '3.14', 'pY', '*', '*', '+', '13.45', '14', '8', '+', 'tan', '-', '8', '/', '+'];
//             let infix = Math.pow(x, y) / (5 * x) + 10 * 3.14 * (3.14 * y) + (13.45 - Math.tan(14 + 8)) / 8;
//             expect(core.solveRpnExpression(tokenSet, expression, x, y)).toEqual(infix);
//         });

//         it('should throw if unable to solve expression', () => {
//             expect(() => { core.solveRpnExpression(tokenSet, ['pX', 'pY'], 12, 5) }).toThrow();
//         });

//         it('should handle numeric tokens', () => {
//             expect(core.solveRpnExpression(tokenSet, [1, 5.5, '+'])).toEqual(6.5);
//         });

//         it('should throw if unspported tokens are encountered', () => {
//             expect(() => { core.solveRpnExpression(tokenSet, ['blah', 'wee', 'moog'])}).toThrow();
//         });

//         it('should use the larger of x and y if a non-real solution is encountered, e.g 1/0, certain powers etc..', () => {
//             expect(core.solveRpnExpression(tokenSet, ['10', '0', '/'], 32, 88)).toEqual(88);
//             expect(core.solveRpnExpression(tokenSet, ['-0.5009874556304168', '-2.3001216687818964', '^'], 12, 4)).toEqual(12);
//             expect(core.solveRpnExpression(tokenSet, ['77', '10085.18958440936', '^'], 65, 10)).toEqual(65);
//         });
        
//         //TODO - get rid of this once we remove rand tokens from the initial set somehow
//         it('should throw if it encounters rand operands', () => {
//             expect(() => { core.solveRpnExpression(tokenSet, ['rand', 'pX', '+'])}).toThrow();
//             expect(() => { core.solveRpnExpression(tokenSet, ['randX', 'pX', '+'])}).toThrow();
//             expect(() => { core.solveRpnExpression(tokenSet, ['randY', 'pX', '+'])}).toThrow();
//         });
        
//     });
    
    
//     describe('getRandomArbitrary', () => {

//     });

//     describe('getRandomInt', () => {

//     });

//     describe('generateIndividuals', () => {

//     });

//     describe('mutateIndividual', () => {


//     });

//     describe('crossOverIndividuals', () => {

//     });

//     describe('evolveIndividuals', () => {

//     });

//     describe('rouletteWheelSelection', () => {



//     });
// });
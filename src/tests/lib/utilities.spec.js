import {selectRoulette, selectTruncate} from '../../lib/utilities';

describe('utilities', () => {
    describe('selectRoulette', () => {
        it('should work', () => {

            const selectIndex = jest.fn(n => 3);
            const selectWeight = jest.fn(n => 1);

            expect(selectRoulette(
                selectIndex, 
                selectWeight, 
                [0.5, 0.5, 1, 0.5]
            )).toEqual(2);

            expect(selectRoulette(
                selectIndex, 
                selectWeight, 
                [0.5, 0.5, 1, 0.5],
                [1]
            )).toEqual(0);

            expect(selectRoulette(
                selectIndex, 
                selectWeight, 
                [0.5, 0.5, 1, 0.5],
                [0.5, 0.5, 1, 0.5]
            )).toEqual(0);

        });
    });

    describe('selectTruncate', () => {
        expect(selectTruncate([
            0.5, 1
        ], 0.5)).toEqual([
            1
        ]);

        expect(selectTruncate([
            0.5, 0.5, 0.8, 1
        ], 0.5)).toEqual([
            2, 3
        ]);
    });
});

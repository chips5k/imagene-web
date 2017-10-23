import {selectRoulette} from '../../lib/utilities';

describe('utilities', () => {
    describe('selectRoulette', () => {
        it('should work', () => {
            let index = selectRoulette(() => {
                return 8
            }, [1, 2, 3, 4]);
            
            expect(index).toEqual(3);
        });
    });
});

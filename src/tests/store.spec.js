import store, {history} from '../store.js';
import reducers from '../reducers';
import { push, routerReducer } from 'react-router-redux';
describe('index', () => {
    
    
    describe('store', () => {
    
        it('should handle navigation via dispatch', () => {
            store.dispatch(push('/test'));
            expect(history.location.pathname).toBe('/test');
        });
    
        it('should handle thunked dispatches', () => {
            let actionA = jest.fn(() => ({ type: 'INITIATE'}));
            let actionB = jest.fn(() => ({ type: 'COMPLETE'}));
    
            store.dispatch((dispatch) => {
                dispatch(actionA());
                dispatch(actionB());
            });
    
            expect(actionA).toHaveBeenCalled();
            expect(actionB).toHaveBeenCalled();
        });
    
    
        it('should contain the correct reducers', () => {
            expect(store.getState().individuals).toEqual(reducers.individuals(undefined, {}));
            expect(store.getState().generations).toEqual(reducers.generations(undefined, {}));
            expect(store.getState().samples).toEqual(reducers.samples(undefined, {}));
            expect(store.getState().config).toEqual(reducers.config(undefined, {}));
            expect(store.getState().router).toEqual(routerReducer(undefined, {}));
        });
    });
    
});
import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import reducers from './reducers'; // Or wherever you keep your reducers

import App from './App';
import Home from './Home';
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();


// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const initialState = {
    population: {
        config: {
            initialPopulation: 24,
            minDepth: 0, 
            maxDepth: 12
        },
        generations: [
            {
                config: {
                    redMin: 0,
                    redMax: 255,
                    greenMin: 0,
                    greenMax: 255,
                    blueMin: 0,
                    blueMax: 255
                },
                individuals: [
                    {
                        id: '...',
                        expression: [],
                        parents: {
                            generationIndex: 0,
                            motherIndex: 1,
                            fatherIndex: 2
                        }
                    }
                ],
                images: [
                    {
                        redIndividualId: '...',
                        greenIndividualId: '...',
                        blueIndividualId: '...'
                    }
                ]
            }
        ]
    }
};

/* combine this with initial state to enable dev tools for redux
 +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
 */

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  initialState,
  applyMiddleware(middleware)
);


ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <App>
        <Route exact path="/" component={Home}/>
      </App>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history, slicer } from './store'
import AppContainer from './containers/AppContainer'
import { bindActionCreators } from './actionCreators';
import addToWorkerQueue from './lib/generationSampleWorkerQueue.js';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <AppContainer slicer={slicer} actionCreators={bindActionCreators(addToWorkerQueue)} addToWorkerQueue={addToWorkerQueue} />
      </div>
    </ConnectedRouter>
  </Provider>,
  root
);
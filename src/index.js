import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

let root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
    <App/>,
    root
);
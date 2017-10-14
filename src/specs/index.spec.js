import React from 'react';

jest.mock('../containers/App', () => {
    return () => {
        return <div id="test"></div>
    }
});

import App from '../containers/App';
import '../index';

describe('index', () => {
    it('renders the app component to the dom', () => {
        expect(document.getElementById("test")).toBeTruthy();
    });
});
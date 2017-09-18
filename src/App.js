import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <nav className="primary-nav">
                    <h1 className="primary-nav__title">Imagene</h1>
                </nav>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        );
    }
};



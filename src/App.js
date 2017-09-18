import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <div className="container">

                <div className="top">
                    <h1 className="title">Imagene</h1>
                </div>

                <div className="middle">
                    {this.props.children}
                </div>
                
                <div className="bottom">
                    <Link to="/">Re-Generate</Link>
                </div>

                <div className="right">
                    <Link to="/">Help</Link>
                </div>
                
            </div>
        );
    }
};



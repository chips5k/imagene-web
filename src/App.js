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
                
                <div className="right">
                    <Link className="home-link" to="/">Home</Link>

                    <div className="population">
                        <h3 className="population__header">Population</h3>
                        <div className="population__body">
                            <div>
                                <label>Size</label>
                                <input type="text" value="" defaultValue={24} />
                            </div>

                            <div>
                                <h4>Depth</h4>
                                <div>
                                    <label>Min</label>
                                    <input type="text" value="" defaultValue={0} />
                                </div>

                                 <div>
                                    <label>Max</label>
                                    <input type="text" value="" defaultValue={12} />
                                </div>
                            </div>  
                        </div>
                    </div>

                    <div className="generations">
                        <h3 className="generations__header">Generations</h3>
                        <div className="generations__body">
                            <div className="generation">
                                <h3 className="generation__header">Generation A</h3>
                                <div className="generation__body">
                                    <div>
                                        <label>No. Samples</label>
                                        <input type="text" value="" defaultValue={6} />
                                        <span>Number of samples to rate</span>
                                    </div>

                                    <div>
                                        <h4>Image/Sample Dimensions</h4>
                                        <div>
                                            <label>Width</label>
                                            <input type="text" value="" defaultValue={255} />
                                        </div>
                                        <div>
                                            <label>Height</label>
                                            <input type="text" value="" defaultValue={255} />
                                        </div>
                                    </div>
                                    <div>
                                        
                                        <h4>RGB Thresholds</h4>
                                        <div>
                                            <label>Red</label>
                                            <input type="text" value="" defaultValue={255} />
                                        </div>
                                        <div>
                                            <label>Green</label>
                                            <input type="text" value="" defaultValue={255} />
                                        </div>
                                        <div>
                                            <label>Blue</label>
                                            <input type="text" value="" defaultValue={255} />
                                        </div>

                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};



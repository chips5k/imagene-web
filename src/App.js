import React, { Component } from 'react';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import PopulationConfig from './components/PopulationConfig';
import GenerationConfig from './components/GenerationConfig';
export default class App extends Component {
    render() {
        return (
            <div className="container">

                <div className="top">
                    <h1 className="top__title">Imagene</h1>
                </div>

                <div className="middle">
                    {this.props.children}
                </div>
                
                <div className="right">

                    <PopulationConfig />
                    <GenerationConfig />
                    <GenerationConfig />
                    <GenerationConfig />
                </div>
            </div>
        );
    }
};



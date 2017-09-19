import React, { Component } from 'react';
import FormControl from './components/FormControl';
import StepperInput from './components/StepperInput';
import PopulationConfig from './components/PopulationConfig';
import GenerationConfig from './components/GenerationConfig';
import logo from './img/logo.svg';
export default class App extends Component {
    render() {
        return (
            <div className="container">

                <div className="top">
                <img className="top__logo" src={logo} height={35} />
                <div className="top__title-container">
                    <h1 className="top__title">Imagene</h1>
                    <small className="top__tagline">Genetic Imaging Application</small>
                </div>
                </div>

                <div className="middle">
                    {this.props.children}
                    
                </div>
                
                <div className="right">

                    <PopulationConfig />
                    <GenerationConfig label="1" />
                    <GenerationConfig label="2" />
                    <GenerationConfig label="3" />
                </div>
            </div>
        );
    }
};



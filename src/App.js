import React, { Component } from 'react';
import PopulationConfig from './components/PopulationConfig';
import GenerationConfig from './components/GenerationConfig';
import logo from './img/logo.svg';
import { updatePopulationConfig } from './actions';

import { connect } from 'react-redux';

class App extends Component {
    
    render() {
        return (
            <div className="container">

                <div className="top">
                <img className="top__logo" src={logo} height={35} alt="Imagene Logo" />
                <div className="top__title-container">
                    <h1 className="top__title">Imagene</h1>
                    <small className="top__tagline">Genetic Imaging Application</small>
                </div>
                </div>

                <div className="middle">
                    {this.props.children}
                </div>
                
                <div className="right">
                    <PopulationConfig {...this.props.populationConfig} onSave={this.props.updatePopulationConfig} />
                    {this.props.generationConfigs.map(generationConfig => 
                        <GenerationConfig {...generationConfig} key={generationConfig.id} />
                    )}
                </div>
            </div>
        );
    }
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
    updatePopulationConfig
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



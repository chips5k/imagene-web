import React, { Component } from 'react';

import { connect } from 'react-redux';

class App extends Component {
    
    render() {
        return (
            <div className="container">
                <div className="sidebar">
                    <div className="sidebar__header">
                        <div className="sidebar__brand">
                            <div className="sidebar__title">
                                Imagene
                            </div>
                            <div className="sidebar__tagline">
                            Evolved Imaging
                            </div>
                        </div>
                        <div className="sidebar__version">
                            Version 1.0.0
                        </div>
                    </div>
                    <div className="sidebar__subheader">
                        <div className="sidebar__subheader-title">
                            Navigation
                        </div>
                        <div className="sidebar__subheader-icon">
                            <i className="fa fa-bars" />   
                        </div>
                    </div>

                    <div className="sidebar__content">


                        <div className="sidebar__nav-group">
                            <div className="sidebar__nav-group-header">
                                <div className="sidebar__nav-group-title">Getting Started</div>
                                <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-home" /> Home
                            </div>  
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-question " /> Help
                            </div>
                        </div>

                        <div className="sidebar__nav-group">
                            <div className="sidebar__nav-group-header">
                                <div className="sidebar__nav-group-title">Population</div>
                                <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                            </div>
                            <div className="sidebar__nav-link sidebar__nav-link--active">
                                <i className="sidebar__nav-icon fa fa-plus" /> New Population
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-pencil" /> Edit Details
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-exchange" /> Import
                            </div>

                        </div>

                        <div className="sidebar__nav-group">
                            <div className="sidebar__nav-group-header">
                                <div className="sidebar__nav-group-title">Generations</div>
                                <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-sitemap" /> Generation 1
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-sitemap" /> Generation 2
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-sitemap" /> Generation 3
                            </div>
                            <div className="sidebar__nav-link">
                                <i className="sidebar__nav-icon fa fa-sitemap" /> Generation 4
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.children}

                

                {/* <div className="top">
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
                </div> */}
            </div>
        );
    }
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



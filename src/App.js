import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class App extends Component {
    
    render() {
        
        let navLinkClass = (n) => {
            return "sidebar__nav-link" + (this.props.router.location.pathname === n ? ' sidebar__nav-link--active' : '');
        }

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
                            <Link to="/" className={navLinkClass("/")}>
                                <i className="sidebar__nav-icon fa fa-home" /> Home
                            </Link>  
                            <Link to="/help" className={navLinkClass("/help")}>
                                <i className="sidebar__nav-icon fa fa-question " /> Help
                            </Link>
                            <Link to="/import" className={navLinkClass("/import")}>
                                <i className="sidebar__nav-icon fa fa-download" /> Import
                            </Link>
                            
                            <Link to="/export" className={navLinkClass("/export")}>
                                <i className="sidebar__nav-icon fa fa-upload" /> Export
                            </Link>
                            
                        </div>

                        <div className="sidebar__nav-group">
                            <div className="sidebar__nav-group-header">
                                <div className="sidebar__nav-group-title">Population</div>
                                <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                            </div>
                            <Link to="/population"  className={navLinkClass("/population")}>
                                <i className="sidebar__nav-icon fa fa-plus" /> View/Edit Population
                            </Link>
                        </div>

                        {this.props.population.individuals.length > 0 &&
                            <div className="sidebar__nav-group">
                                <div className="sidebar__nav-group-header">
                                    <div className="sidebar__nav-group-title">Generations</div>
                                    <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                                </div>
                                <Link to="/generations"  className={navLinkClass("/generations")}>
                                    <i className="sidebar__nav-icon fa fa-sitemap" />  {this.props.generations.length ? 'List Generations' : 'Configure Initial Generation'}
                                </Link>
                                {this.props.generations.map(n => 
                                    <Link to={"/generations/" + n.id}  className={navLinkClass("/generations/" + n.id)}key={n.id}>
                                        <i className="sidebar__nav-icon fa fa-sitemap" /> Generation {n.id}
                                    </Link>
                                )}
                               
                                   
                                
                            </div>
                        }
                    </div>
                </div>
                {this.props.children}
            </div>
        );
    }
};

const mapStateToProps = state => state;

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



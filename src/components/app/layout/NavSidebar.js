import React, { Component } from 'react';

class NavSidebar extends Component {
    
    determineClass(n) {
        return "nav-sidebar__item" + (this.props.location === n ? ' nav-sidebar__item--active' : '');
    }
    
    render() {
        return (
            <div className="nav-sidebar">
                <div className="nav-sidebar__main">
                    <div className="nav-sidebar__header">
                        <div className="nav-sidebar__brand">
                            <div className="nav-sidebar__title">
                                Imagene
                            </div>
                            <div className="nav-sidebar__tagline">
                            Evolved Imaging
                            </div>
                        </div>
                        <div className="nav-sidebar__version">
                            Version 1.0.0
                        </div>
                    </div>
                    <div className="nav-sidebar__subheader"  onClick={this.props.onToggleClick}>
                        <div className="nav-sidebar__subheader-title">
                            Navigation
                        </div>
                        <a href="" className="nav-sidebar__subheader-icon">
                            <i className="fa fa-bars" />   
                        </a>
                    </div>

                    <div className="nav-sidebar__content">
                        <div className="nav-sidebar__item-group">
                            
                            <a href="" onClick={this.props.onLinkClick.bind(null, "/")} className={this.determineClass("/")}>
                                <i className="nav-sidebar__item-icon fa fa-home" /> <span className="nav-sidebar__item-label">Home</span>
                            </a>  

                            {this.props.generations.length === 0 && 
                            <a href="" onClick={this.props.onLinkClick.bind(null, "/new-generation")} className={this.determineClass()} >
                                <i className="nav-sidebar__nav-icon fa fa-sitemap" /> <span className="nav-sidebar__item-label">New Generation</span>
                            </a>}

                            <a href="" onClick={this.props.onLinkClick.bind(null, "/import")} className={this.determineClass("/import")}>
                                <i className="nav-sidebar__nav-icon fa fa-download" /> <span className="nav-sidebar__item-label">Import</span>
                            </a>
                            
                            <a href="" onClick={this.props.onLinkClick.bind(null, "/export")} className={this.determineClass("/export")}>
                                <i className="nav-sidebar__nav-icon fa fa-upload" /> <span className="nav-sidebar__item-label">Export</span>
                            </a>
                        </div>

                        {this.props.generations.length > 0 &&
                            <div className="nav-sidebar__nav-group">
                                <div className="nav-sidebar__nav-group-header">
                                    <div className="nav-sidebar__nav-group-title">Generations</div>
                                    <i className="nav-sidebar__nav-group-toggle fa fa-angle-down"></i>
                                </div>

                                {this.props.generations.map(n => 
                                    <a href="" onClick={this.props.onLinkClick.bind(null, "/generation/" + n.id)}  className={this.determineClass("/generation/" + n.id)} key={n.id}>
                                        <i className="nav-sidebar__item-icon">
                                            #{n.id}    
                                        </i>
                                        <span className="nav-sidebar__item-label">Generation {n.id}</span>
                                    </a>
                                )}
                            </div>
                        }
                    </div>
                </div>
                <div className="nav-sidebar__blocker" onClick={this.props.onBlockerClick}>

                </div>
            </div>
        );
    }
}

export default NavSidebar;
import React, { Component } from 'react';

class Sidebar extends Component {
    
    determineClass(n) {
        return "sidebar__nav-link" + (this.props.location === n ? ' sidebar__nav-link--active' : '');
    }
    
    onClickNewGeneration(e) {
        e.preventDefault();
        if(window.innerWidth < 1224) {
            this.props.toggleSidebar(e);
        }
        this.props.onClickNewGeneration(24, 6, 12);
    };

    onClickLink(location, e) {
        e.preventDefault();
        if(window.innerWidth < 1224) {
            this.props.toggleSidebar(e);
        }
        this.props.redirect(location);
    }

    
    render() {
        return (
            <div className="sidebar">
                <div className="sidebar__main">
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
                        <a href="" className="sidebar__subheader-icon" onClick={this.props.toggleSidebar}>
                            <i className="fa fa-bars" />   
                        </a>
                    </div>

                    <div className="sidebar__content">
                        <div className="sidebar__nav-group">
                            <div className="sidebar__nav-group-header">
                                <div className="sidebar__nav-group-title">Getting Started</div>
                                <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                            </div>
                            <a href="" onClick={this.onClickLink.bind(this, "/")} className={this.determineClass("/")}>
                                <i className="sidebar__nav-icon fa fa-home" /> <span className="sidebar__nav-label">Home</span>
                            </a>  

                            {this.props.generations.length === 0 && 
                            <a href="" onClick={this.onClickNewGeneration.bind(this)} className={this.determineClass()} >
                                <i className="sidebar__nav-icon fa fa-sitemap" /> <span className="sidebar__nav-label">New Generation</span>
                            </a>}

                            <a href="" onClick={this.onClickLink.bind(this, "/import")} className={this.determineClass("/import")}>
                                <i className="sidebar__nav-icon fa fa-download" /> <span className="sidebar__nav-label">Import</span>
                            </a>
                            
                            <a href="" onClick={this.onClickLink.bind(this, "/export")} className={this.determineClass("/export")}>
                                <i className="sidebar__nav-icon fa fa-upload" /> <span className="sidebar__nav-label">Export</span>
                            </a>
                        </div>

                        {this.props.generations.length > 0 &&
                            <div className="sidebar__nav-group">
                                <div className="sidebar__nav-group-header">
                                    <div className="sidebar__nav-group-title">Generations</div>
                                    <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                                </div>

                                {this.props.generations.map(n => 
                                    <a href="" onClick={this.onClickLink.bind(this, "/generation/" + n.id)}  className={this.determineClass("/generation/" + n.id)} key={n.id}>
                                        <i className="sidebar__nav-icon">
                                            #{n.id}    
                                        </i>
                                        <span className="sidebar__nav-label">Generation {n.id}</span>
                                    </a>
                                )}
                            </div>
                        }
                    </div>
                </div>
                <div className="sidebar__blocker" onClick={this.props.toggleSidebar}>

                </div>
            </div>
        );
    }
}

export default Sidebar;
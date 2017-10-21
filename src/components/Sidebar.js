import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(props) {

    let determineClass = (n) => {
        return "sidebar__nav-link" + (props.location === n ? ' sidebar__nav-link--active' : '');
    }
    
    let onClickNewGeneration = (e) => {
        e.preventDefault();
        props.onClickNewGeneration(24, 6, 12);
    };

    return (
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
                <a href="" className="sidebar__subheader-icon" onClick={props.toggleSidebar}>
                    <i className="fa fa-bars" />   
                </a>
            </div>

            <div className="sidebar__content">
                <div className="sidebar__nav-group">
                    <div className="sidebar__nav-group-header">
                        <div className="sidebar__nav-group-title">Getting Started</div>
                        <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                    </div>
                    <Link to="/" className={determineClass("/")}>
                        <i className="sidebar__nav-icon fa fa-home" /> <span className="sidebar__nav-label">Home</span>
                    </Link>  

                    {props.generations.length === 0 && 
                    <a href="" onClick={onClickNewGeneration} className={determineClass()} >
                        <i className="sidebar__nav-icon fa fa-sitemap" /> <span className="sidebar__nav-label">New Generation</span>
                    </a>}

                    <Link to="/import" className={determineClass("/import")}>
                        <i className="sidebar__nav-icon fa fa-download" /> <span className="sidebar__nav-label">Import</span>
                    </Link>
                    
                    <Link to="/export" className={determineClass("/export")}>
                        <i className="sidebar__nav-icon fa fa-upload" /> <span className="sidebar__nav-label">Export</span>
                    </Link>
                </div>

                {props.generations.length > 0 &&
                    <div className="sidebar__nav-group">
                        <div className="sidebar__nav-group-header">
                            <div className="sidebar__nav-group-title">Generations</div>
                            <i className="sidebar__nav-group-toggle fa fa-angle-down"></i>
                        </div>

                        {props.generations.map(n => 
                            <Link to={"/generation/" + n.id}  className={determineClass("/generation/" + n.id)} key={n.id}>
                                <i className="sidebar__nav-icon">
                                    #{n.id}    
                                </i>
                                <span className="sidebar__nav-label">Generation {n.id}</span>
                            </Link>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};



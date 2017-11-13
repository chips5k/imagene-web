import React from 'react';

export const ActionBar = props => (
    <div className="action-bar">
        {props.children}
    </div>
);

export const ActionBarItem = props => (
    <a className={`action-bar__item ${props.active ? 'action-bar__item--active' : ''}`} href="" onClick={props.onClick}>
        <i className={`icon ${props.iconClass}`}></i> {props.text}
    </a>
);



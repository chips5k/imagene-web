import React from 'react';

export const ActionBar = props => (
    <div className="action-bar">
        {props.children}
    </div>
);

export const ActionBarItem = props => (
    <a className="action-bar__item" href="" onClick={props.onClick}>
        <i className={`icon ${props.iconClass}`}></i> {props.text}
    </a>
);



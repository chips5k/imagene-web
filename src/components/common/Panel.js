import React from 'react';

export const Panel =(props) => {
    return (
        <div className="panel">
            {props.children}
        </div>
    );
}

export const PanelHeader =(props) => {
    return (
        <div className="panel__header">
            <div className="panel__title">
                {props.children}
            </div>
        </div>
    );
}

export const PanelBody =(props) => {
    return (
        <div className="panel__body">
            {props.children}
        </div>
    );
}


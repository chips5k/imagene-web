import React from 'react';

const PanelSidebar =(props) => {
    return (
        <div className="panel-sidebar">
            <div className="panel-sidebar__content">
                {props.children}
            </div>
            <div className="panel-sidebar__blocker" onClick={props.onBlockerClick}></div>
        </div>
    );
}

export default PanelSidebar;
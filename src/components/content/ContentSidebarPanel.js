import React from 'react';

const ContentSidebarPanel =(props) => {
    return (
        <div className="main-sidebar-panel">
            {props.children}
        </div>
    );
}

export default ContentSidebarPanel;


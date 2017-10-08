import React from 'react';

const ContentSidebarPanelFooter =(props) => {
    return (
        <div className="main-sidebar-panel__actions">
            {props.children} 
        </div>
    );
}

export default ContentSidebarPanelFooter;


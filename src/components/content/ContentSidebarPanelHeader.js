import React from 'react';

const ContentSidebarPanelHeader =(props) => {
    return (
        <div className="main-sidebar-panel__header">
            <div className="main-sidebar-panel__title">
                {props.children}
            </div>
        </div>
    );
}

export default ContentSidebarPanelHeader;

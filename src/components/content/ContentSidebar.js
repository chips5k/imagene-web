import React from 'react';

const ContentSidebar =(props) => {
    return (
        <div className="main__sidebar">
            <a href="" onClick={props.toggleContentSidebar} className="main__content-sidebar-toggle">
                <i className={`fa ${props.contentSidebarVisible ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
            </a>
            <div className="main__content-sidebar-content-wrapper">
            {props.children}
            </div>
        </div>
    );
}

export default ContentSidebar;
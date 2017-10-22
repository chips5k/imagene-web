import React from 'react';

const ContentHeader = (props) => {

    
    return (
        <div className="main__header">
            <a href="" className="main__sidebar-toggle" onClick={props.toggleSidebar}><i className="fa fa-bars"></i></a>
            <div className="main__title" onClick={props.toggleSidebar}>{props.children}</div>
            {props.contentSidebar && 
            <a href="" className="main__sidebar-content-toggle" onClick={props.toggleContentSidebar}><i className="fa fa-cog"></i> Settings</a>
            }
        </div>
    );
}

export default ContentHeader;

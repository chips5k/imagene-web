import React from 'react';

const ContentSidebar =(props) => {
    return (
        <div className="main__sidebar">
        <div className="main__sidebar-main">
            {props.children}
        </div>
        <div className="main__sidebar-blocker" onClick={props.toggleContentSidebar}></div>
        </div>
    );
}

export default ContentSidebar;
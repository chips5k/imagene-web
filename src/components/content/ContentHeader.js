import React from 'react';

const ContentHeader = (props) => {

    
    return (
        <div className="main__header">
            <a href="" className="main__sidebar-toggle" onClick={props.toggleSidebar}><i className="fa fa-bars"></i></a>
            <div className="main__title">{props.children}</div>
        </div>
    );
}

export default ContentHeader;

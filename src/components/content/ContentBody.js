import React from 'react';

const ContentBody = (props) => {
    return (
        
        <div className={`main__body ${props.contentSidebarVisible ? '' : 'main__body--content-sidebar-offscreen'}`}>
            {props.children}
        </div>
      
    );
}

export default ContentBody;


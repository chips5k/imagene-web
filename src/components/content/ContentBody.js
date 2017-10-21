import React from 'react';

const ContentBody = (props) => {
    const classes = 'main__body' + (props.contentSidebarVisible ? '' : ' main__body--content-sidebar-offscreen') + 
    (props.sidebar ? '' : ' main__body-no-sidebar');

    return (
        
        <div className={classes}>
            {props.children}
        </div>
      
    );
}

export default ContentBody;


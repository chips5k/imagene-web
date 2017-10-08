import React from 'react';

const ContentSidebar =(props) => {
    return (
        <div className="main__sidebar">
            {props.children}
        </div>
    );
}

export default ContentSidebar;
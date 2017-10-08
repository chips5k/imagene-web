import React from 'react';

const ContentBody = (props) => {
    return (
        <div className="main__content">
            {props.children}
        </div>
    );
}

export default ContentBody;


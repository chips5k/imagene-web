import React from 'react';

const ContentHeader = (props) => {
    return (
        <div className="main__header">
            <div className="main__title">{props.children}</div>
        </div>
    );
}

export default ContentHeader;

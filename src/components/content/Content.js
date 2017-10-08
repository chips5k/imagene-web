import React from 'react';

const Content =(props) => {
    return (
        <div className="main">
            {props.children}
        </div>
    );
}

export default Content;
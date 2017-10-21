import React from 'react';

const ContentBodyPrimaryBottomNav = (props) => {
    return (
        <div className={`${props.classes} main__content-bottom-nav`}>
            {props.children}
        </div>
    );
}

export default ContentBodyPrimaryBottomNav;


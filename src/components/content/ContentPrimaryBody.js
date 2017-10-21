import React from 'react';

const ContentBodyPrimaryBody = (props) => {
    
    const classNames = "main__content-body" + (props.topNav ? '' : ' main__content-body--no-top-nav') + (props.bottomNav ? '' : ' main__content-body--no-bottom-nav');
    
     

    return (
        <div className={classNames}>
            {props.children}
        </div>
    );
}

export default ContentBodyPrimaryBody;


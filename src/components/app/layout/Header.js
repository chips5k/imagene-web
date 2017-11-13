import React from 'react';

const Header = props => (
    <div className="header">
        {props.children}
    </div>
);

export const HeaderButton = props => (
    <div className="header__button" onClick={props.onClick}>
        <i className={`header__button-icon ${props.iconClass}`} />
        {props.children}
    </div>
);

export const HeaderTitle = props => (
    <div className="header__title">
        {props.children}
    </div>
);

export default Header;
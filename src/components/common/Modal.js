import React from 'react';

export const Modal = props => (
    <div className={'modal' + (props.open ? ' modal--open' : '')}>
        <div className="modal__panel">
            {props.children}
        </div>
        <div className="modal__blocker"  onClick={props.onCloseModalClick}></div>
    </div>
);

export const ModalHeader = props => (
    <div className="modal__header">
        <h2 className="modal__title">
            {props.children}
        </h2>
        <a href="" className="modal__close" onClick={props.onCloseModalClick}>
            <i className="fa fa-remove"></i>
        </a>
    </div>
);

export const ModalBody = props => (
    <div className="modal__body">
        {props.children}
    </div>
);

export const ModalFooter = props => (
    <div className="modal__footer">
        {props.children}
    </div>
);
    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../common/Modal';
import React, { Component } from 'react';

export default class HelpModal extends Component {


    render() {
       
        return (
           <Modal onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    Help
                </ModalHeader>
                <ModalBody>
                    <div className="vertical-flex-box flex-fill" style={{maxWidth: 500}}>
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <button className="button" onClick={this.props.onCloseModalClick}>Close</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
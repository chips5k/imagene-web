import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../common/Modal';
import React, { Component } from 'react';

export default class VideoModal extends Component {


    render() {
       
        return (
           <Modal className="video-modal" onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    Video Walkthrough
                </ModalHeader>
                <ModalBody>
                    <iframe title="tutorial" width="854" height="480" src="https://www.youtube.com/embed/XSWF2hm-hBA" frameborder="0" gesture="media" allowfullscreen></iframe>
                </ModalBody>
                <ModalFooter>
                    <button className="button" onClick={this.props.onCloseModalClick}>Close</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
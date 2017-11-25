import FormControl from '../../common/controls/FormControl';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../common/Modal';
import React, { Component } from 'react';

export default class ImportSamplesModal extends Component {
    
    render() {
        return (
           <Modal onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    Import Previous Data
                </ModalHeader>
                <ModalBody>
                    <FormControl label="Import File">
                        <input type="file" />
                    </FormControl>
                    
                </ModalBody>
                <ModalFooter>
                    <button className="button button--primary" onClick={this.props.onImportClick}>Import</button>
                    <button className="button" onClick={this.props.onCloseModalClick}>Cancel</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
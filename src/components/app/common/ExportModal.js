import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../common/Modal';
import React, { Component } from 'react';

export default class ExportSamplesModal extends Component {
    
    render() {
        return (
           <Modal onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    Export Current Session Data
                </ModalHeader>
                <ModalBody>

                    <p style={{maxWidth: 500}}>To export/save the current session data, click the export button below. This will allow you to download a file that can be later imported and resumed</p>

                    <p>Please note: the cached binary image data for samples will not be exported, just the individuals used to generate the RGB components. Upon importing this file, the system will automatically regenerate the samples on-demand</p>

                </ModalBody>
                <ModalFooter>
                    <button className="button button--primary" onClick={this.props.onExportClick}>Export</button>
                    <button className="button" onClick={this.props.onCloseModalClick}>Cancel</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
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
                    <div className="vertical-flex-box flex-fill">
                    <p>To export/save the current session data, click the export button below. This will allow you to download a file that can be later imported and resumed</p>

                    <p>Please note: the cached binary image data for samples will not be exported, just the individuals used to generate the RGB components. Upon importing this file, the system will automatically regenerate the samples on-demand</p>

                    <p>If your device does not support exporting/saving of non-image files, you may copy the text below, and later paste it into the text area in the import modal.</p>
                    <textarea ref="copy" rows="5" cols="10" style={{height:100, flex: 1}} defaultValue={JSON.stringify(this.props.currentState)} />
                    </div>

                </ModalBody>
                <ModalFooter>
                    <button className="button button--primary" onClick={this.props.onExportClick}>Export</button>
                    <button className="button" onClick={this.props.onCloseModalClick}>Cancel</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
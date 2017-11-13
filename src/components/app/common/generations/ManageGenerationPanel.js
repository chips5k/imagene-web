import React from 'react';

import { Panel, PanelBody, PanelHeader } from '../../../common/Panel';

const ManageGenerationPanel = props => (
    <Panel>
        <PanelHeader>
        <i className="fa fa-sitemap"></i> Evolve Generation
        </PanelHeader>
        <PanelBody>
            <p>When you are happy with the fitness values of this population/sample set, click the button below to evolve a new generation.</p>

            <button className="button button--primary" onClick={props.onEvolveGenerationClick}>
                <i className="fa fa-chevron-right"></i> Evolve Generation
            </button>
        </PanelBody>
    </Panel>
);

export default ManageGenerationPanel;
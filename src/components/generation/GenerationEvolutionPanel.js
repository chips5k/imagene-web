import React from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader, 
} from '../content';

const GenerationEvolutionPanel = (props) => {
    return (
        <ContentSidebarPanel>
            <ContentSidebarPanelHeader>
                <i className="fa fa-sitemap"></i> Evolve New Generation
            </ContentSidebarPanelHeader>
            <ContentSidebarPanelBody>
                <p>When you are happy with the fitness values of this population/sample set, click the button below to evolve a new generation.</p>

                <button className="main-sidebar-panel__action-button" onClick={props.onClickEvolveGeneration}>
                    <i className="fa fa-chevron-right"></i> Evolve New Generation
                </button>
            </ContentSidebarPanelBody>
        </ContentSidebarPanel>
    );
}

export default GenerationEvolutionPanel;
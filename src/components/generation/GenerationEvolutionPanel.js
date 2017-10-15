import React from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader, 
    ContentSidebarPanelFooter
} from '../content';

const GenerationEvolutionPanel = (props) => {
    return (
        <ContentSidebarPanel>
            <ContentSidebarPanelHeader>
                Evolve New Generation
            </ContentSidebarPanelHeader>
            <ContentSidebarPanelBody>
                <p>When you are happy with the fitness values of this population/sample set, click the button below to evolve a new generation.</p>
            </ContentSidebarPanelBody>
            <ContentSidebarPanelFooter>
                <button className="main-sidebar-panel__action-button" onClick={props.onClickEvolveGeneration}>
                    <i className="fa fa-refresh"></i> Evolve New Generation
                </button>
            </ContentSidebarPanelFooter>
        </ContentSidebarPanel>
    );
}

export default GenerationEvolutionPanel;
import React, {Component} from 'react';

import {
    ContentSidebarPanel,
    ContentSidebarPanelBody,
    ContentSidebarPanelHeader, 
} from '../content';

export default class GenerationEvolutionPanel extends Component {

    onClickEvolveGeneration(e) {
        e.preventDefault();
        this.props.onClickEvolveGeneration(e);
        this.props.toggleContentSidebar(e);
    }

    render() {

        return (
            <ContentSidebarPanel>
                <ContentSidebarPanelHeader>
                    <i className="fa fa-sitemap"></i> Evolve New Generation
                </ContentSidebarPanelHeader>
                <ContentSidebarPanelBody>
                    <p>When you are happy with the fitness values of this population/sample set, click the button below to evolve a new generation.</p>

                    <button className="button button--primary" onClick={this.onClickEvolveGeneration.bind(this)}>
                        <i className="fa fa-chevron-right"></i> Evolve New Generation
                    </button>
                </ContentSidebarPanelBody>
            </ContentSidebarPanel>
        );
    }
}
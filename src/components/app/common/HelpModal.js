import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../common/Modal';
import React, { Component } from 'react';

export default class HelpModal extends Component {


    render() {
       
        return (
           <Modal className="help-modal" onCloseModalClick={this.props.onCloseModalClick} open={this.props.open}>
               <ModalHeader onCloseModalClick={this.props.onCloseModalClick}>
                    How to use Imagene / Help
                </ModalHeader>
                <ModalBody>
                    <div style={{maxWidth: 500}}>
                    <h3>Generating a Population/Generation of Individuals</h3>

                    <p>To get started, open the left nav (if it is not already open) and select "New Generation".
                        This will take you to the "generations" page, where you can configure the parameters for generating your initial population.
                    </p>

                    <p>By default, the system will create a population of 24 individuals with a minimum depth of 0 and maximum depth of 12. 
                        Should you wish to adjust this, expand the right hand panel (if it is not visible), by clicking the "settings" button in the top right corner.</p>

                    <p>Once you've adjusted the settings to your liking, click the "Generate" button. This will update the page with a list of the individuals in the current population.
                         If you are not happy with the results, click "Generate" or "Regenerate" to initialize a different set of individuals.</p>

                    <p><b>Please note:</b> setting a high minimum depth may result in large individuals, this can cause performance issues when generating images/samples.</p>


                    <h3>Generating Samples from a population</h3>

                    <p>Now that you have a population initialized, you can proceed to generating samples from the set of individuals. 
                        To do this, click the "Samples" tab followed by "Generate Samples", or click the "Generate Samples" button located at the foot of the page.</p>

                    <p>This will generate 4 samples with normal RGB Thresholds. If you would like to generate more samples at a time, open the settings sidebar and increase the number of samples.</p>

                    <p>Adjusting the RGB Thresholds will result in limiting the min/max values a colour channel value can take.</p>

                    <p>Clicking generate samples, may take a few moments as R, G and B components are calculated from the individual expressions for each pixel in the image. The more complex the expression/individual, the longer this will take</p>

                    <p>Once the samples have generated, you may view the individuals used for the R, G and B components by clicking the
                         <i className="fa fa-eye" style={{marginLeft:'0.5rem', marginRight: '0.5rem'}}></i> icon/button on the lower right of the sample.</p>

                    
                    <h3>Rating samples to control fitness of individuals</h3>

                    <p>Once you have a set of samples available, you can adjust their fitness by clicking the plus and minus icons. Put simply, if you like a particular sample, increase its fitness value, and if you dislike it, decrease it. 
                        Adjusting the fitness of the samples will result in the fitness levels of the underlying RGB Individuals being increased. You can see the results of this by clicking the <i className="fa fa-eye" style={{marginLeft:'0.5rem', marginRight: '0.5rem'}}></i> icon/button, or viewing the individuals tab.</p>

                    <p>Once you've adjusted the fitness values, you may generate more samples - generation of new samples will take into account your previous fitness ratings, and deliver images featuring the individuals you preferred.</p>

                    <p>We recommend generating up to 10 samples per population and rating them appropriately before choosing to "Evolve" the population.</p>


                    <h3>Evolving a Population</h3>

                    <p>As mentioned previously, we suggest rating at least 10 samples to increase the chances of similar individuals being included during evolution.</p>

                    <p>Once you are satisified with the ratings you have set, you can click the "Evolve" button located in the footer action bar, or via the settings side bar.</p>

                    <p>You will be directed to a new Generation where you can view the result of evolving the population. When performing evolution, our system takes the top 50% of the population and includes it in the new generation. These members are then cross-over, and mutated until the population size returns to the original size.</p>
                    
                    <p>At this point, you can now proceed to generate new samples, rate them and evolve again. If at any point you would like to return to a previous generation, you may do so by accessing the left hand side menu and choosing a previous generation.
                        Once you've selected a generation you can choose to generate and rate more samples, and then click the "Evolve" button to do-over the evolution process.
                    </p>
                    

                    <h3>Exporting and Importing your sessions</h3>

                    <p>By default, Imagene will always remember your current session, so that when you return to the page - your previous data will be preloaded. If you've cleared your browser history however, this will not be retained</p>

                    <p>If you would like to save the state of your session, you can choose to export it as a JSON data file, that can be later imported. To do this, open the left hand menu and choose "Export". This will open a modal with brief instructions. Click the Export button in this panel, and a JSON file will begin to download.</p>

                    <p>To import an existing session, click the import button and then click the "Choose File" button and navigate to the location of your saved JSON data file. Once you've located the file, click "Import" to load the saved session.</p>



                    <h3>Exporting Samples/Images</h3>

                    <p>At any point, you may choose to export/save a copy of your samples. To do this, either click the <i className="fa fa-save" style={{marginLeft:'0.5rem', marginRight: '0.5rem'}}></i>
                    icon/button on an individual sample or select multiple samples by click the title/checkbox and opening the right hand settings menu and choosing "Export selected samples".</p>

                    <p>This will open a modal with options to customize the export of your samples. You can choose to adjust the dimensions of your exports and limit the RGB Thresholds.</p>

                    <p>One you have specified your desired settings, click the "Export" button and the samples will begin generating based on the supplied input. Once completed, you can click the blue links for each sample to download the images</p>

                    </div>
                </ModalBody>    
                <ModalFooter>
                    
                    <button className="button" onClick={this.props.onCloseModalClick}>Close</button>
                </ModalFooter>
            </Modal>
        );
    }
}

    
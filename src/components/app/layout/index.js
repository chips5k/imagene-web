import React, { Component } from 'react';
import 'roboto-fontface';
import 'font-awesome/css/font-awesome.css';
import '../../../assets/css/index.css';
import NavSidebar from './NavSidebar';
import Main from './Main';

class Layout extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            navSidebarManuallyToggled: false,
            navSidebarVisible: window.innerWidth >= 1224
        };

    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        if(window.innerWidth > 1224) {
            if(this.state.navSidebarManuallyToggled === false) {
                this.setState({
                    navSidebarVisible: true
                });
            }
        } else {
            if(this.state.navSidebarManuallyToggled === false) {
                this.setState({
                    navSidebarVisible: false
                });
            }
        }
    };

    toggleNavSidebar() {
        
        //Determine if user has reverted to default state, and clear the manual toggle state
        let navSidebarManuallyToggled = true;
        if(window.innerWidth >= 1224 && this.state.navSidebarVisible === false) {
            navSidebarManuallyToggled = false;
        };

        if(window.innerWidth < 1224 && this.state.navSidebarVisible === true) {
            navSidebarManuallyToggled = false;
        }

        this.setState({
            navSidebarManuallyToggled: navSidebarManuallyToggled,
            navSidebarVisible: !this.state.navSidebarVisible
        });
    }
    
    handleNavSidebarToggleClick(e) {
        e.preventDefault();
        this.toggleNavSidebar();
    }

    handleNavSidebarBlockerClick(e) {
        e.preventDefault();
        this.toggleNavSidebar();
    }

    render() {
        return (
            <div className={`container ${this.state.navSidebarVisible ? '' : 'container--nav-sidebar-offscreen'}`}>
                <NavSidebar 
                    onToggleClick={this.handleNavSidebarToggleClick.bind(this)} 
                    onBlockerClick={this.handleNavSidebarBlockerClick.bind(this)}
                    onLinkClick={this.props.onSidebarLinkClick}
                    generations={this.props.generations}
                    location={this.props.location}
                />
                <Main>{this.props.children}</Main>
            </div>
        );
    }
}


export default Layout;
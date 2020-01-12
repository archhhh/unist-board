import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import FullPost from './FullPost';
import About from './About';
import Header from './Header';
import Footer from './Footer';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavClosed: true,
            sort: {
                isOpen: false,
                selectedOption: 'date',  
            },
            filter: {
                isOpen: false,
                selectedOption: 'all-time',  
            },
        };
    }

    closeDropdown = (e) => {
        let currentNode = e.target;
        while(currentNode != null && currentNode.tagName != 'NAV' && currentNode.className != 'options')
            currentNode = currentNode.parentElement;
        if(!currentNode)
            this.setState(
                {
                    isNavClosed: true,
                    sort: 
                        {
                            ...this.state.sort,
                            isOpen: false
                        }, 
                    filter: 
                        {
                            ...this.state.filter,
                            isOpen:false
                        }
                }
            );
        else if(currentNode.tagName == 'NAV'){
            this.setState(
                {
                    sort: 
                        {
                            ...this.state.sort,
                            isOpen: false
                        }, 
                    filter: 
                        {
                            ...this.state.filter,
                            isOpen:false
                        }
                }
            );
        }else{
            this.setState(
                {
                    isNavClosed: true,  
                }
            );
        }
    };

    toggleNav = () => {
        this.setState(
            {
                isNavClosed: !this.state.isNavClosed
            }
        );
    }

    toggleFilter = (filter) => {
        this.setState(
            {
                sort: 
                {
                    ...this.state.sort,
                    isOpen: false
                }, 
                filter: 
                {
                    ...this.state.filter,
                    isOpen:false
                },
                [filter]: {
                    ...this.state[filter],
                    isOpen: !this.state[filter].isOpen
                },
            }
        );
    }

    selectOptionFilter = (filter, option) => {
        this.setState(
            {
                [filter]: {
                    selectedOption: option,
                    isOpen: false
                },
            }
        );
    }

    render(){
        return (
            <BrowserRouter>
                <div className="App" onClick={(e) => this.closeDropdown(e)}>
                    <Route render={ (props) => <Header {...props} isNavClosed={this.state.isNavClosed} toggleNav={this.toggleNav}/> } />
                    <div className="main">
                        <div className="left">
                            <Switch>
                                <Route exact path='/about' render={ (props) => 
                                    <About 
                                        {...props} 
                                    /> 
                                } />
                                <Route exact path={['/', '/:board']} render={(props) => 
                                    <Posts 
                                        {...props}
                                        sort={this.state.sort}
                                        filter={this.state.filter}
                                        toggleFilter={this.toggleFilter}
                                        selectOptionFilter={this.selectOptionFilter}
                                    />
                                }/>
                                <Route exact path='/:board/:post' render={(props) => 
                                    <FullPost 
                                        {...props} 
                                    />
                                }/>
                            </Switch>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
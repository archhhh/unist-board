import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import FullPost from './FullPost';
import About from './About';
import Header from './Header';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            isNavClosed: true,
        };
    }

    toggleNav = (e) => {
        let currentNode = e.target;
        while(currentNode != null && currentNode.tagName != 'NAV')
            currentNode = currentNode.parentElement;
        if(currentNode)
            this.setState({isNavClosed: !this.state.isNavClosed});
        else
            this.setState({isNavClosed: true});
    }

    render(){
        return (
            <BrowserRouter>
                <div className="App" onClick={(e) => this.toggleNav(e)}>
                    <Route render={ (props) => <Header {...props} isNavClosed={this.state.isNavClosed} toggleNav={this.toggleNav}/> } />
                    <Switch>
                        <Route exact path='/about' render={ (props) => 
                            <About 
                                {...props} 
                            /> 
                        } />
                        <Route exact path={['/', '/:board']} render={(props) => 
                            <Posts 
                                {...props} 
                            />
                        }/>
                        <Route exact path='/:board/:post' render={(props) => 
                            <FullPost 
                                {...props} 
                            />
                        }/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
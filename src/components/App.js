import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Posts from './Posts';
import FullPost from './FullPost';
import About from './About';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            boards: [], 
            isLoading: false,
            isNavClosed: true,
        };
    }

    toggleNav = () => {
        return;
    }

    componentDidMount = () => {
        let boards = [];
        this.setState({isLoading: true});
        db.collection('boards').get()
        .then(
            (querySnapshot) => {
                querySnapshot.forEach(
                    (doc) => {
                        boards.push(
                            {
                                id: doc.id,
                                icon: doc.data().icon,
                                name: doc.data().name,
                                description: doc.data().description
                            }
                        );
                    }
                );
                this.setState({boards: boards, isLoading: false});
            }
        )
        .catch( 
            (error) => {
                console.log(error);
            }
        );
    }
    render(){
        return (
            <BrowserRouter>
                <div className="App" onClick={this.toggleNav}>
                    {this.state.isLoading && <div className='loading'></div>} 
                    <Switch>
                        <Route exact path='/about' render={ (props) => 
                            <About 
                                {...props} 
                                boards={this.state.boards} 
                                isNavClosed={this.state.isNavClosed} 
                                toggleNav={this.toggleNav}
                            /> 
                        } />
                        <Route exact path={['/', '/:board']} render={(props) => 
                            <Posts 
                                {...props} 
                                boards={this.state.boards} 
                                isNavClosed={this.state.isNavClosed} 
                                toggleNav={this.toggleNav}
                            />
                        }/>
                        <Route exact path='/:board/:post' render={(props) => 
                            <FullPost 
                                {...props} 
                                boards={this.state.boards} 
                                isNavClosed={this.state.isNavClosed} 
                                toggleNav={this.toggleNav}
                            />
                        }/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
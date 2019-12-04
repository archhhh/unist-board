import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Posts from './Posts';
import FullPost from './FullPost';

class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <Header></Header>
                    <Switch>
                        <Route exact path={['/', '/:board']} render={(props) => <Posts {...props} />} />
                        <Route exact path='/:board/:id' render={(props) => <FullPost {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import News from './News';

class App extends Component{
    render(){
        return (
            <div className="App">
                <Header></Header>
                <News></News>
            </div>
        );
    }
}

export default App;
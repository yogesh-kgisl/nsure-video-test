import React,{Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Claim from './View/Claim';
import Layout from './Layout/layout';
class App extends Component{

  render(){
    return(
   <div className = 'App'>
        <Router >
          <Switch>
            <Route exact path = '/' component = {Claim} />
            <Route  path = '/nsure/viewclaim' component = {Layout} />
            <Route  path = '/chat/:roomid' component = {Layout} />
          </Switch>
        </Router>
        </div>
    )
  }
}

export default App;

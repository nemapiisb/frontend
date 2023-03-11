import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListAdComponent from "./components/ListAdComponent";
import CreateAdComponent from "./components/CreateAdComponent";
import ShowAdComponent from "./components/ShowAdComponent";

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListAdComponent}></Route>
                          <Route path = "/anuncios" component = {ListAdComponent}></Route>
                          <Route path = "/add-ad/:id" component = {CreateAdComponent}></Route>
                          <Route path = "/edit-ad/:id" component = {CreateAdComponent}></Route>
                          <Route path = "/show-ad/:id" component = {ShowAdComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;

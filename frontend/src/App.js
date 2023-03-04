import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CrearVecinoComponent from "./components/CrearVecinoComponent";
import ListarVecinoComponent from "./components/ListarVecinoComponent";
import VerVecinoComponent from "./components/VerVecinoComponent";

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {ListarVecinoComponent}></Route>
                          <Route path = "/vecinos" component = {ListarVecinoComponent}></Route>
                          <Route path = "/add-vecino/:id" component = {CrearVecinoComponent}></Route>
                          <Route path = "/view-vecino/:id" component = {VerVecinoComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;

import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './components/home/index'
import Page from './components/Page'
import Detail from './components/breedDetails'
import Forms from './components/Forms';

function App() {
  return (
    <Router>
     <Route exact path="/" component={Page} />
     <Route path="/home" component={Home} />
     <Route path="/details/:id" component={Detail} />
     <Route path="/breedCreate" component={Forms} />
    </Router>
  );
}

export default App;

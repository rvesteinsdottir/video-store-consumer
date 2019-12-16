import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import MovieSearch from './components/MovieSearch';
import MovieLib from './components/MovieLib';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/customers">Customers</Link>
              </li>
              <li>
                <Link to="/search">Movie Search</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
            </ul>
          </nav>
        
        
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/customers">
              <CustomerList />
            </Route>
            <Route path="/search">
              <MovieSearch />
            </Route>
            <Route path="/library">
              <MovieLib />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

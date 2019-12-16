import React, { Component } from 'react';
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
import axios from 'axios';

const BASE_URL = 'http://localhost:3000'

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      selectedMovie: undefined,
      customers: [],
      selectedCustomer: undefined,
      error: undefined,
    };
  } 

  componentDidMount() {
    axios.get(`${BASE_URL}/customers`)
    .then((response) => {
      const customers = Object.keys(response.data).map((customer) => { 
        return response.data[customer]
      })

      this.setState({ 
        customers,
        error: undefined
      });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

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
              <CustomerList customerList={this.state.customers} />
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

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

      const customers = response.data;

      this.setState({ 
        customers,
        error: undefined
      });
    })
    .catch((error) => {
      this.setState({
        error: error.message 
      });
    });

    axios.get(`${BASE_URL}/movies`)
    .then((response) => {
      const movies = response.data;
      this.setState({ 
        movies,
        error: undefined
      });
    })
    .catch((error) => {
      this.setState({ error: error.message });
    });
  }

  addMovie = (externalId) => {
    if (!this.state.movies.find(movie => movie.external_id === externalId)) {
      console.log('adding movie to the DB')
      params 
      axios.post()
    }
  }

  selectMovie = (movieId) => {
    const { movies } = this.state;

    const selectedMovie = movies.find((movie) => {
      return movie.id === movieId;
    })
    
    this.setState({ selectedMovie, })
  }

  selectCustomer(id) {
    const { customers } = this.state;

    const selectedCustomer = customers[id - 1]

    this.setState({
      selectedCustomer,
    })
  }

  createRental() {
    if(this.state.selectedMovie) {
      const movieTitle = this.state.selectedMovie.title
      const customerId = this.state.selectedCustomer.id
      let dueDate = new Date()
      dueDate.setDate(new Date().getDate() + 1);

      const params = {
        customer_id: customerId,
        due_date: dueDate.toISOString(), 
      }

      axios.post(`${BASE_URL}/rentals/${movieTitle}/check-out`, params)
      .then(() => {

        this.setState({
          selectedMovie: undefined,
          selectedCustomer: undefined,
          error: undefined,
        })
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              {this.state.selectedMovie ? <li>Selected Movie:{this.state.selectedMovie.title}</li> : "" }
              {this.state.selectedCustomer ? <li>Selected Customer:{this.state.selectedCustomer.name}</li> : "" }
              {this.state.selectedMovie ? <li><button onClick={() => this.createRental()}>Create a Rental</button>  </li> : ''}
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
              <CustomerList customerList={this.state.customers} selectCustomer={(id) => this.selectCustomer(id)} />
            </Route>
            <Route path="/search">
              <MovieSearch url={BASE_URL} selectMovie={(externalId) => this.addMovie(externalId)}  />
            </Route>
            <Route path="/library">
              <MovieLib movieList={this.state.movies} selectMovie={(externalId) => this.selectMovie(externalId)} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

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
import Button from 'react-bootstrap/Button';

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

  addMovie = (movieToAdd) => {
    console.log(movieToAdd)
    if (!this.state.movies.find(movie => movie.external_id === movieToAdd.external_id)) {
      console.log('adding movie to the DB')
      axios.post(`${BASE_URL}/movies`, movieToAdd)
      .then((response) => {
        console.log(response.data);
        const { movies } = this.state;
        movies.push(movieToAdd)
        this.setState({
          movies,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  }

  selectMovie = (movieId) => {
    console.log(movieId)
    const { movies } = this.state;

    const selectedMovie = movies.find((movie) => {
      return movie.external_id === movieId;
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

  selectedItemClass() {
    if (this.state.selectedCustomer || this.state.selectedMovie) {
      return "items-selected"
    } else {
      return "no-items-selected"
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="sidenav">
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
            <div className={this.selectedItemClass()}>
              {this.state.selectedMovie ? ("Selected Movie: \n" + this.state.selectedMovie.title) : "" }
              <br />
              {this.state.selectedCustomer ? ("Selected Customer: \n" + this.state.selectedCustomer.name) : "" }
              <br />
              {(this.state.selectedMovie && this.state.selectedCustomer )? <Button onClick={() => this.createRental()}>Create a Rental</Button> : ''}
            </div>
          </div>
          
          <div className="main">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/customers">
                <CustomerList customerList={this.state.customers} selectCustomer={(id) => this.selectCustomer(id)} />
              </Route>
              <Route path="/search">
                <MovieSearch url={BASE_URL} selectMovie={(movie) => this.addMovie(movie)} />
              </Route>
              <Route path="/library">
                <MovieLib movieList={this.state.movies} selectMovie={(id) => this.selectMovie(id)} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

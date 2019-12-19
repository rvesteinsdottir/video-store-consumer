import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'
import axios from 'axios';
import './MovieSearch.css'
import reels from '../reels.jpeg'

class MovieSearch extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      searchResults: [],
      error: undefined,
      searchDetailsMovie: undefined
    }
  }

  onInputChange = (event) => {
    this.setState({ title: event.target.value });
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const { title } = this.state

    if (title) {
      const params = {query: title}      
      axios.get(`${this.props.url}/movies`, { params })
      .then((response) => {
        this.setState({
          searchResults: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
    }
  }

  showDetails = (movieId) => {
    const { searchDetailsMovie, searchResults } = this.state;

    if (searchDetailsMovie && searchDetailsMovie.external_id === movieId) {
      this.setState({ searchDetailsMovie: undefined })
    } else {

      const searchDetailsMovie = searchResults.find((movie) => {
        return movie.external_id === movieId;
      })

      this.setState({ searchDetailsMovie })
    }
  }


  searchForm = () => {
    return(
    <form onSubmit={this.onSubmitHandler}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            id="title"
            onChange={this.onInputChange}
            value={this.state.title}
          />
        </div>
        <input
          type="submit"
          name="submit"
          onClick={this.onSubmitHandler}
        />
    </form>
    )}

  databaseMovies = () => this.state.searchResults.map((movie, i) => {
    return <Movie
      key={i}
      { ...movie }
      selectMovie={() => this.props.selectMovie(movie)}
      detailsCallback={() => this.showDetails(movie.external_id) }
      searchDetailsMovie={this.state.searchDetailsMovie}
      />
  });

  reels = () => {
    return(
      <img src={reels} />
    ) 
  }
  
  render () {
    return (
      <div>
        <h3>Movie Search</h3>
        <form onSubmit={this.onSubmitHandler}>
          <div>
            <input
              name="title"
              id="title"
              onChange={this.onInputChange}
              value={this.state.title}
            />
          </div>
        <input
          type="submit"
          name="submit"
          className="submit-button"
          onClick={this.onSubmitHandler}
        />
        </form>
        <div className="row">
          {this.state.searchResults ? this.databaseMovies() : this.reels()}
        </div>
      </div>
    )
  }
}

MovieSearch.propTypes = {
  url: PropTypes.string.isRequired,
  selectMovie: PropTypes.func.isRequired,
}

export default MovieSearch;
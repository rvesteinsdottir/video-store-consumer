import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'

const MovieLib = (props) => {
  
  const makeMovies = () => props.movieList.map((movie, i) => {
    return <Movie
      key={i}
      { ...movie }
      selectMovie={(id) => props.selectMovie(id)}
      inLibrary="true"
      />
  });
  
  return (
    <div>
      <h3>MovieLib</h3>
      {makeMovies()}
    </div>
  )
}

export default MovieLib;

import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'
import './MovieLib.css'

const MovieLib = ({ movieList, selectMovie, detailsCallback, detailsMovie }) => {
  
  const makeMovies = () => movieList.map((movie, i) => {
    return <Movie
      key={i}
      { ...movie }
      selectMovie={() => selectMovie(movie.external_id)}
      inLibrary="true"
      detailsCallback={() => detailsCallback(movie.external_id) }
      detailsMovie={detailsMovie}
      />
  });
  
  return (
    <div>
      <h3>Movie Library</h3>
      <div className="row">
        {makeMovies()}
      </div>
    </div>
  )
}

MovieLib.propTypes = {
  movieList: PropTypes.array.isRequired,
  selectMovie: PropTypes.func.isRequired,
  detailsCallback: PropTypes.func.isRequired,
  detailsMovie: PropTypes.object,
}

export default MovieLib;


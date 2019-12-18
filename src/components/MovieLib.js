import React from 'react';
import PropTypes from 'prop-types';
import Movie from './Movie'

const MovieLib = (props) => {
  
  const makeMovies = () => props.movieList.map((movie, i) => {
    return <Movie
      key={i}
      { ...movie }
      selectMovie={() => props.selectMovie(movie.external_id)}
      inLibrary="true"
      detailsCallback={() => props.detailsCallback(movie.external_id) }
      detailsMovie={props.detailsMovie}
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


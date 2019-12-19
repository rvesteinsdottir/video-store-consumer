import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap/';
import './Movie.css';

const Movie = ({ title, release_date, overview, image_url, id, selectMovie, detailsMovie, external_id, searchDetailsMovie, detailsCallback, inLibrary }) => {

  const isDetailed = (detailsMovie && (detailsMovie.external_id === external_id)) || ((searchDetailsMovie && (searchDetailsMovie.external_id === external_id)));

  const fakeReviews = () => {
    const raisahThoughts = ['Even better than', 'Cannot compare to', 'Almost on par with', 'Kinda reminds me of', 'Not as good as']
    
    const raisahShows = ['the Crown', 'Gourmet Makes', 'The Great British Bakeoff', 'The Office']
    
    return (
      <div>
        <div>"...A triumph."</div>
        <div>-New York Times</div>
        <br />
        <div>"{raisahThoughts[Math.floor(Math.random() * raisahThoughts.length)]} {raisahShows[Math.floor(Math.random() * raisahShows.length)]}."</div>
        <div>-Raisah</div>
      </div>
      );
  }

  return (
    <Card className={ isDetailed ? "movie-card" : "col-sm-3 movie-card__brief" } >
      <div onClick={ () => detailsCallback(id) }>

        <div className={ isDetailed ? "movie-card-body" : "movie-card-body__brief" }>
          <img src={image_url} className="movie-card-image" alt="movie cover"/>
          
          <div className="movie-card-title">  
            {title}
          </div>
          
          <div className="movie-card-release-date">{release_date}</div>
          
          <div className="movie-card-description">
            <p>{isDetailed ? overview : ""}</p>
            <div className="movie-quotes">{isDetailed ? fakeReviews() : ""}</div>
          </div>

          <div className={ isDetailed ? "movie-card-button" : "movie-card-button__brief" } >
            <Button 
              onClick={() => selectMovie(id)}>{inLibrary ? "Select" : "Add to Rental Library"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

Movie.propTypes = {
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  id: PropTypes.number,
  selectMovie: PropTypes.func,
  detailsMovie: PropTypes.object,
  external_id: PropTypes.number,
  searchDetailsMovie: PropTypes.func,
  detailsCallback: PropTypes.func, 
  inLibrary: PropTypes.string,
}

export default Movie;

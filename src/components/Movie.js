import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap/';
import './Movie.css';

const Movie = (props) => {

  const isDetailed = (props.detailsMovie && (props.detailsMovie.external_id === props.external_id));

  return (
    <Card className={ isDetailed ? "movie-card" : "movie-card__brief" } >
      <div onClick={ () => props.detailsCallback(props.id) }>

        <div className={ isDetailed ? "movie-card-body" : "movie-card-body__brief" }>
          <img src={props.image_url} className="movie-card-image" alt="movie cover"/>
          
          <div className="movie-card-title">  
            {props.title}
          </div>
          
          <div className="movie-card-release-date">{props.release_date}</div>
          
          <div className="movie-card-description">
            {isDetailed ? props.overview : ""}
          </div>

          <div className="movie-card-button" >
            <Button 
              onClick={() => props.selectMovie(props.id)}>{props.inLibrary ? "Select" : "Add to Rental Library"}
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
}

export default Movie;

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap/';
import './Movie.css';

const Movie = (props) => {

  return (
    <Card className="movie-card">
      <div >

        <div className="movie-card-body">
          <img src={props.image_url} className="movie-card-image" alt="movie cover"/>
          <div className="movie-card-title">  
            {props.title}
          </div>
          <div className="movie-card-release-date">   
            {props.release_date}
          </div>
          <div className="movie-card-description">
            {props.overview} 
          </div>
          <div className="movie-card-button" >
            <Button onClick={() => props.selectMovie(props.id)}>{props.inLibrary ? "Select" : "Add to Rental Library"}</Button>
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
}

export default Movie;

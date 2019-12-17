import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap/';
import './Movie.css';

const Movie = (props) => {

  return (
    <Card className="movie-card">
      <div >

        <div className="movie-card-body">
          <img src={props.image_url} className="movie-card-image"/>
          <div className="movie-card-title">  
            {props.title}
          </div>
          <div className="movie-card-release-date">{props.release_date}</div>
          <div className="movie-card-description">
            {props.overview}
            
          </div>
          <div className="movie-card-button" >
            <Button onClick={() => props.selectMovie(props.id)}>Select This Movie!</Button>
          </div>

        </div>
      </div>
    </Card>
  )
}

export default Movie;

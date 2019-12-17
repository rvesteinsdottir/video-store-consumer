import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';


const Movie = (props) => {

  return (
    <div>
      <h4>{props.title}</h4>
      <p>{props.id}</p>
      <p>{props.overview}</p>
      <p>{props.release_date}</p>
      <img src={props.image_url} />
      <Button onClick={() => props.selectMovie(props.id)}>Select This Movie!</Button>
    </div>
  )
}

export default Movie;

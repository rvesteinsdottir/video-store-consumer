import React from 'react';
import PropTypes from 'prop-types';

const Movie = (props) => {

  return (
    <div>
      <h4>{props.title}</h4>
      <p>{props.id}</p>
      <p>{props.overview}</p>
      <p>{props.release_date}</p>
      <img src={props.image_url} />
      <button onClick={() => props.selectMovie(props.id)}>{props.inLibrary ? 'Select This Movie!' : 'Add to the Database'}</button>
    </div>
  )
}

export default Movie;
